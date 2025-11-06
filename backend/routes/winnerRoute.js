const express = require("express");
const router = express.Router();
const winnerController = require("../controllers/battle/winner/winnerController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post(
  "/select-weekly",
  authMiddleware,
  winnerController.selectWeeklyWinners
);
router.get(
  "/most-liked",
  authMiddleware,
  winnerController.getMostLikedBattlePost
);
router.get(
  "/user-history/:userId",
  // authMiddleware,
  winnerController.getUserBattleHistory
);
// router.get("/", winnerController.getAllWinners);

module.exports = router;
