const express = require("express");
const router = express.Router();
const authRoutes = require("../routes/authRoute");
const postRoutes = require("../routes/postRoute");
const userRoute = require("../routes/userRoute");
const battleRoute = require("../routes/battleRoute");

router.use("/auth", authRoutes);
router.use("/user", userRoute);
router.use("/post", postRoutes);
router.use("/battle", battleRoute);

module.exports = router;
