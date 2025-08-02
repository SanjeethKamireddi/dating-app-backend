const express = require("express");
const {
  createOrUpdateProfile,
  getMatches,
  getMyProfile,
  getMutualMatches,
  toggleOnlineStatus,
} = require("../controllers/profileController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const User = require("../models/User");

const router = express.Router();

router.put("/setup", authMiddleware, createOrUpdateProfile);
router.get("/matches", authMiddleware, getMatches);
router.get("/me", authMiddleware, getMyProfile);
router.get("/mutual", authMiddleware, getMutualMatches);
router.put("/status", authMiddleware, toggleOnlineStatus);
router.put(
  "/upload-picture",
  authMiddleware,
  upload.single("picture"),
  async (req, res) => {
    try {
      const userId = req.user.userId;

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const picturePath = `/uploads/${req.file.filename}`;
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePicture: picturePath },
        { new: true }
      );

      res.status(200).json({
        message: "Profile picture uploaded successfully",
        profilePicture: picturePath,
        user: updatedUser,
      });
    } catch (err) {
      console.error("Upload error:", err.message);
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
