const { success, error } = require("../../helpers/response");
const db = require("../../db/db");

const addHighlight = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, storyId } = req.body;
    if (!name) {
      return error(
        res,
        "Highlight name is required",
        null,
        400,
        "INVALID_INPUT"
      );
    }

    let coverImage = req.file ? req.file.filename : null;
    // Ensure storyId is always an array
    const storyIds = Array.isArray(storyId) ? storyId : [storyId];
    const stories = await db("stories")
      .whereIn("id", storyIds)
      .andWhere("userId", userId);
    if (!stories || stories.length === 0) {
      return error(
        res,
        "Stories not found, At least one story must be provided",
        null,
        404,
        "STORY_NOT_FOUND"
      );
    }
    const [highlightId] = await db("highlights").insert({
      userId,
      name,
      cover_image: coverImage,
    });
    const addStories = storyIds.map((st) => ({
      highlight_id: highlightId,
      story_id: st,
    }));
    await db("highlight_stories").insert(addStories);
    return success(res, { highlightId }, 201, "add  highlight Successfully!!!");
  } catch (err) {
    return error(res, "Failed to process highlight request", err.message, 500);
  }
};

const existingHighlight = async (req, res) => {
  try {
    const userId = req.user.id;

    const { highlightId, storyId } = req.body;
    if (!highlightId) {
      return error(res, "Highlight Id is required", null, 400, "INVALID_INPUT");
    }
    const storyIds = Array.isArray(storyId) ? storyId : [storyId];
    const highlightExists = await db("highlights")
      .where({ id: highlightId, userId })
      .first();
    if (!highlightExists) {
      return error(
        res,
        "Highlight not exist , Create new One",
        404,
        "NOT_FOUND"
      );
    }
    const addStories = storyIds.map((st) => ({
      highlight_id: highlightId,
      story_id: st,
    }));
    await db("highlight_stories").insert(addStories);
    return success(
      res,
      addStories,
      201,
      "add stories to existing highlight Successfully!!!"
    );
  } catch (err) {
    return error(
      res,
      "Failed to add stories in existing highlight",
      err.message,
      500
    );
  }
};

const getHighlight = async (req, res) => {
  try {
    const userId = req.user.id;
    const highlights = await db("highlights")
      .where({ userId })
      .where({ status: 0 })
      .orderBy("created_at", "desc");

    return success(res, highlights, 200, "Highlights fetched successfully");
  } catch (err) {
    return error(
      res,
      "Failed to fetch highlights",
      err.message,
      500,
      "HIGHLIGHT_FETCH_FAILED"
    );
  }
};

const getHighlightStories = async (req, res) => {
  try {
    const { highlightId } = req.params;
    const stories = await db("highlight_stories as hs")
      .join("stories as s", "hs.story_id", "=", "s.id")
      .where("hs.highlight_id", highlightId)
      .where("hs.status", 0)
      .where("s.status", 0)
      .select("s.*")
      .orderBy("s.created_at", "desc");
    return success(res, stories, 200, "Highlight stories fetched successfully");
  } catch (err) {
    return error(
      res,
      "Failed to fetch highlight stories",
      err.message,
      500,
      "HIGHLIGHT_STORIES_FETCH_FAILED"
    );
  }
};

const editHighlight = async (req, res) => {
  try {
    const userId = req.user.id;
    const { highlightId, name, removeStoryId, addStoryId } = req.body;

    const coverImage = req.file ? req.file.filename : null;
    const removeStoryIds = Array.isArray(removeStoryId)
      ? removeStoryId.filter((id) => id != null)
      : removeStoryId != null
      ? [removeStoryId]
      : [];

    const addStoryIds = Array.isArray(addStoryId)
      ? addStoryId.filter((id) => id != null)
      : addStoryId != null
      ? [addStoryId]
      : [];

    if (!highlightId) {
      return error(res, "Highlight Id is required", null, 404, "INVALID_INPUT");
    }
    const highlight = await db("highlights")
      .where({ id: highlightId, userId })
      .first();
    if (!highlight) {
      return error(res, "Highlight not found", null, 404, "NOT_FOUND");
    }
    const updated = await db("highlights")
      .where({ id: highlightId, userId })
      .update({ name, cover_image: coverImage, updated_at: new Date() });
    if (!updated) {
      return error(res, "Highlight not found", null, 404, "NOT_FOUND");
    }

    if (removeStoryIds && removeStoryIds.length) {
      await db("highlight_stories")
        .whereIn("story_id", removeStoryIds)
        .andWhere("highlight_id", highlightId)
        .update({ status: 1 });
    }
    if (addStoryIds && addStoryIds.length) {
      const addStories = addStoryIds.map((st) => ({
        highlight_id: highlightId,
        story_id: st,
        added_at: new Date(),
      }));

      await db("highlight_stories").insert(addStories);
    }
    return success(res, null, 200, "Highlight updated successfully");
  } catch (err) {
    return error(
      res,
      "Failed to update highlight",
      err.message,
      500,
      "HIGHLIGHT_UPDATE_FAILED"
    );
  }
};

const deleteHighlight = async (req, res) => {
  try {
    const userId = req.user.id;
    const { highlightId, storyId } = req.body;
    if (!highlightId) {
      return error(res, "Highlight Id is required", null, 404, "INVALID_INPUT");
    }
    // Check if highlight exists and belongs to user
    const highlight = await db("highlights")
      .where({ id: highlightId, userId })
      .first();
    if (!highlight) {
      return error(res, "Highlight not found", null, 404, "NOT_FOUND");
    }
    if (storyId) {
      const deleted = await db("highlight_stories")
        .where({ highlight_id: highlightId, story_id: storyId })
        .update({ status: 1 });
      if (!deleted) {
        return error(
          res,
          "Highlight story not found in highlights_stories",
          null,
          404,
          "NOT_FOUND"
        );
      }
      return success(
        res,
        null,
        200,
        "Story removed from highlight successfully"
      );
    }
    await db("highlights").where({ id: highlightId }).update({ status: 1 });

    return success(res, null, 200, "Highlight deleted successfully");
  } catch (err) {
    return error(
      res,
      "Failed to delete highlight",
      err.message,
      500,
      "HIGHLIGHT_DELETE_FAILED"
    );
  }
};

module.exports = {
  getHighlight,
  getHighlightStories,
  editHighlight,
  deleteHighlight,
  addHighlight,
  existingHighlight,
};
