const { success, error } = require("../../helpers/response");
const db = require("../../db/db");

// follow - unfollow - public account
const toggleFollow = async (req, res) => {
  const followingId = Number(req.params.userId); // the target user
  const followerId = req.user?.id; // current logged-in user

  if (!Number.isInteger(followingId) || followingId <= 0) {
    return error(
      res,
      "Invalid userId",
      "userId must be a positive integer",
      400,
      "INVALID_USER_ID"
    );
  }

  if (!followerId) {
    return error(
      res,
      "Unauthorized",
      "Missing user id on request",
      401,
      "UNAUTHORIZED"
    );
  }

  if (followerId === followingId) {
    return error(
      res,
      "Invalid action",
      "You cannot follow yourself",
      400,
      "SELF_FOLLOW"
    );
  }

  try {
    let action = "followed";
    let status = "accepted";

    await db.transaction(async (trx) => {
      // 1) Ensure target user exists
      const target = await trx("users")
        .select("id", "account_privacy")
        .where({ id: followingId })
        .first();
      if (!target) throw new Error("USER_NOT_FOUND");

      // 2) Check if already following
      const existing = await trx("follows")
        .where({ followerId, followingId })
        .first();

      if (existing) {
        // Unfollow → delete regardless of status
        await trx("follows").where({ followerId, followingId }).del();

        if (existing.status === "accepted") {
          // decrement counters only if already accepted
          await trx("users")
            .where({ id: followerId })
            .update({
              following_count: trx.raw("GREATEST(following_count - 1, 0)"),
            });

          await trx("users")
            .where({ id: followingId })
            .update({
              followers_count: trx.raw("GREATEST(followers_count - 1, 0)"),
            });
        }

        action = "unfollowed";
        status = existing.status;
      } else {
        // New follow or request
        if (target.account_privacy === "private") {
          // request → pending
          await trx("follows").insert({
            followerId,
            followingId,
            status: "pending",
          });
          action = "requested";
          status = "pending";
        } else {
          // instant follow
          await trx("follows").insert({
            followerId,
            followingId,
            status: "accepted",
          });

          await trx("users")
            .where({ id: followerId })
            .update({ following_count: trx.raw("following_count + 1") });

          await trx("users")
            .where({ id: followingId })
            .update({ followers_count: trx.raw("followers_count + 1") });

          status = "accepted";
        }
      }
    });

    return success(res, { action, status }, 200, `User successfully ${action}`);
  } catch (err) {
    if (err.message === "USER_NOT_FOUND") {
      return error(res, "User not found", null, 404, "USER_NOT_FOUND");
    }
    return error(
      res,
      "Failed to toggle follow",
      err.message,
      500,
      "FOLLOW_TOGGLE_FAILED"
    );
  }
};

// follow - private account
const respondToFollowRequest = async (req, res) => {
  const { requestId } = req.params;
  const { action } = req.body;
  const userId = req.user?.id;

  try {
    let updated = null;

    await db.transaction(async (trx) => {
      const request = await trx("follows")
        .where({ followerId: requestId })
        .first();
      if (!request) throw new Error("REQUEST_NOT_FOUND");

      if (request.followingId !== userId) {
        throw new Error("NOT_AUTHORIZED");
      }

      if (action === "accept") {
        if (request.status === "pending") {
          await trx("follows")
            .where({ followerId: requestId })
            .update({ status: "accepted" });

          await trx("users")
            .where({ id: request.followerId })
            .update({ following_count: trx.raw("following_count + 1") });

          await trx("users")
            .where({ id: userId })
            .update({ followers_count: trx.raw("followers_count + 1") });

          updated = "accepted";
        } else {
          updated = request.status; // already accepted/rejected
        }
      } else if (action === "reject") {
        //  If already rejected or deleted, don’t do anything again
        if (request.status === "pending") {
          await trx("follows").where({ id: requestId }).del();
          updated = "rejected";
        } else {
          updated = request.status;
        }
      }
    });

    return success(res, { status: updated }, 200, `Follow request ${updated}`);
  } catch (err) {
    if (err.message === "REQUEST_NOT_FOUND") {
      return error(res, "Request not found", null, 404, "REQUEST_NOT_FOUND");
    }
    if (err.message === "NOT_AUTHORIZED") {
      return error(res, "Not authorized", null, 403, "NOT_AUTHORIZED");
    }
    return error(
      res,
      "Failed to process request",
      err.message,
      500,
      "FOLLOW_REQUEST_FAILED"
    );
  }
};
const followController = async (req, res) => {
  const targetId = Number(req.params.userId); // user to follow OR request from
  const userId = req.user?.id; // logged-in user
  const { action  } = req.body; // toggle | accept | reject

  if (!Number.isInteger(targetId) || targetId <= 0) {
    return error(res, "Invalid userId", "Must be a positive integer", 400);
  }

  if (!userId) {
    return error(res, "Unauthorized", "Missing logged-in user", 401);
  }

  try {
    let finalAction = null;
    let statusResult = null;

    await db.transaction(async (trx) => {
      // Fetch target user
      const targetUser = await trx("users")
        .select("id", "account_privacy")
        .where({ id: targetId })
        .first();

      if (!targetUser) throw new Error("USER_NOT_FOUND");

      // Fetch follow record
      const followRow = await trx("follows")
        .where({ followerId: userId, followingId: targetId })
        .first();

      // ---------------------------------------------------
      // ACTION: ACCEPT FOLLOW REQUEST
      // ---------------------------------------------------
      if (action === "accept") {
        if (!followRow || followRow.status !== "pending")
          throw new Error("REQUEST_NOT_FOUND");

        if (targetId !== userId) throw new Error("NOT_AUTHORIZED");

        await trx("follows")
          .where({ followerId: followRow.followerId, followingId: userId })
          .update({ status: "accepted" });

        await trx("users")
          .where({ id: followRow.followerId })
          .update({ following_count: trx.raw("following_count + 1") });

        await trx("users")
          .where({ id: userId })
          .update({ followers_count: trx.raw("followers_count + 1") });

        finalAction = "accepted";
        statusResult = "accepted";
        return;
      }

      // ---------------------------------------------------
      // ACTION: REJECT REQUEST
      // ---------------------------------------------------
      if (action === "reject") {
        if (!followRow) throw new Error("REQUEST_NOT_FOUND");
        if (targetId !== userId) throw new Error("NOT_AUTHORIZED");

        await trx("follows")
          .where({ followerId: followRow.followerId, followingId: userId })
          .del();

        finalAction = "rejected";
        statusResult = "rejected";
        return;
      }

      // ---------------------------------------------------
      // ACTION: DEFAULT → TOGGLE FOLLOW
      // ---------------------------------------------------
      if (action === "toggle") {
        if (userId === targetId) {
          throw new Error("SELF_FOLLOW");
        }

        // already following → UNFOLLOW
        if (followRow) {
          await trx("follows")
            .where({ followerId: userId, followingId: targetId })
            .del();

          if (followRow.status === "accepted") {
            await trx("users")
              .where({ id: userId })
              .update({
                following_count: trx.raw("GREATEST(following_count - 1, 0)"),
              });

            await trx("users")
              .where({ id: targetId })
              .update({
                followers_count: trx.raw("GREATEST(followers_count - 1, 0)"),
              });
          }

          finalAction = "unfollowed";
          statusResult = followRow.status;
          return;
        }

        // NEW FOLLOW
        if (targetUser.account_privacy === "private") {
          await trx("follows").insert({
            followerId: userId,
            followingId: targetId,
            status: "pending",
          });

          finalAction = "requested";
          statusResult = "pending";
        } else {
          await trx("follows").insert({
            followerId: userId,
            followingId: targetId,
            status: "accepted",
          });

          await trx("users")
            .where({ id: userId })
            .update({ following_count: trx.raw("following_count + 1") });

          await trx("users")
            .where({ id: targetId })
            .update({ followers_count: trx.raw("followers_count + 1") });

          finalAction = "followed";
          statusResult = "accepted";
        }
      }
    });

    return success(res, { action: finalAction, status: statusResult }, 200);
  } catch (err) {
    if (err.message === "USER_NOT_FOUND") {
      return error(res, "User not found", null, 404);
    }
    if (err.message === "REQUEST_NOT_FOUND") {
      return error(res, "Follow request not found", null, 404);
    }
    if (err.message === "NOT_AUTHORIZED") {
      return error(res, "Not authorized to accept/reject", null, 403);
    }
    if (err.message === "SELF_FOLLOW") {
      return error(res, "You cannot follow yourself", null, 400);
    }

    return error(res, "Failed", err.message, 500);
  }
};

module.exports = { toggleFollow, respondToFollowRequest, followController };
