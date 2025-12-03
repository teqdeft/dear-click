const db = require("../../db/db");
const { success, error } = require("../../helpers/response");

const searchUsers = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim() === "") {
      return success(res, [], 200, "Empty search");
    }

    const keyword = `%${q}%`;

    const users = await db("users")
      .select("id", "name", "username", "profile_pic")
      .whereILike("name", keyword)
      .orWhereILike("username", keyword)
      .orderBy("name", "asc");

    return success(res, users, 200, "Search results fetched");
  } catch (err) {
    return error(res, "Something went wrong", err.message, 500);
  }
};

const fetchPostsForSearch = async (req, res) => {
  try {
    const posts = await db("posts")
      .leftJoin("user_account_settings as uas", "posts.userId", "uas.userId")
      .select(
        "posts.id",
        "posts.userId",
        "posts.caption",
        "posts.media_url",
        "posts.thumbnail_url",
        "posts.location",
        "posts.like_count",
        "posts.comment_count",
        "posts.share_count",
        "posts.save_count",
        "posts.created_at",
        "posts.updated_at"
      )
      .where(function () {
        this.where("uas.account_privacy", "!=", "private").orWhereNull(
          "uas.account_privacy"
        ); // if no settings exist
      })
      .orderBy("posts.created_at", "desc");

    return success(res, posts, 200, "Posts fetched successfully");
  } catch (err) {
    console.error(err);
    return error(res, "Something went wrong", err.message, 500);
  }
};

const GetUserDeatilsById = async (req, res) => {
  try {
    const { id } = req.params;
    const currentUserId = req.user?.id;

    const user = await db("users").select("*").where("id", id).first();

    if (!user) {
      return error(res, "User not found", "User not found", 404);
    }

    delete user.password;

    let followStatus = null;

    if (currentUserId) {
      const followRow = await db("follows")
        .select("status")
        .where({
          followerId: currentUserId,
          followingId: Number(id),
        })
        .first();

      followStatus = followRow ? followRow.status : null;
    }

    return success(
      res,
      { ...user, followStatus },
      200,
      "User fetched successfully"
    );
  } catch (err) {
    console.error(err);
    return error(res, "Something went wrong", err.message, 500);
  }
};

module.exports = { searchUsers, fetchPostsForSearch, GetUserDeatilsById };
