const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  likeUser,
  dislikeUser,
} = require("../controllers/interactionController");

router.post("/like/:targetUserId", authMiddleware, likeUser);
router.post("/dislike/:targetUserId", authMiddleware, dislikeUser);

module.exports = router;
