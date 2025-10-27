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
      "INVALID_user_ID"
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
      const target = await trx("user")
        .select("id", "account_privacy")
        .where({ id: followingId })
        .first();
      if (!target) throw new Error("user_NOT_FOUND");

      // 2) Check if already following
      const existing = await trx("follows")
        .where({ followerId, followingId })
        .first();

      if (existing) {
        // Unfollow → delete regardless of status
        await trx("follows").where({ followerId, followingId }).del();

        if (existing.status === "accepted") {
          // decrement counters only if already accepted
          await trx("user")
            .where({ id: followerId })
            .update({
              following_count: trx.raw("GREATEST(following_count - 1, 0)"),
            });

          await trx("user")
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

          await trx("user")
            .where({ id: followerId })
            .update({ following_count: trx.raw("following_count + 1") });

          await trx("user")
            .where({ id: followingId })
            .update({ followers_count: trx.raw("followers_count + 1") });

          status = "accepted";
        }
      }
    });

    return success(res, { action, status }, 200, `user successfully ${action}`);
  } catch (err) {
    if (err.message === "user_NOT_FOUND") {
      return error(res, "user not found", null, 404, "user_NOT_FOUND");
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
  const { requestId } = req.params; // id from follows table
  const { action } = req.body; // "accept" or "reject"
  const userId = req.user?.id; // the user who owns the account

  try {
    let updated = null;

    await db.transaction(async (trx) => {
      const request = await trx("follows").where({ id: requestId }).first();
      if (!request) throw new Error("REQUEST_NOT_FOUND");

      if (request.followingId !== userId) {
        throw new Error("NOT_AUTHORIZED");
      }

      if (action === "accept") {
        if (request.status === "pending") {
          await trx("follows")
            .where({ id: requestId })
            .update({ status: "accepted" });

          await trx("user")
            .where({ id: request.followerId })
            .update({ following_count: trx.raw("following_count + 1") });

          await trx("user")
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

module.exports = { toggleFollow, respondToFollowRequest };
