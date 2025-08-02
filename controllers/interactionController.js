const User = require("../models/User");

const likeUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    const targetUserId = req.params.targetUserId;

    const currentUser = await User.findById(userId);
    const targetUser = await User.findById(targetUserId);

    if (!currentUser || !targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (currentUser.likedUsers.includes(targetUserId)) {
      return res.status(400).json({ message: "Already liked this user" });
    }

    currentUser.likedUsers.push(targetUserId);

    if (targetUser.likedUsers.includes(userId)) {
      currentUser.matches.push(targetUserId);
      targetUser.matches.push(userId);

      await currentUser.save();
      await targetUser.save();

      console.log(
        `Mock Firebase Notification: ${currentUser.name} and ${targetUser.name} matched!`
      );

      return res.status(200).json({ message: "It’s a match!" });
    }

    await currentUser.save();
    res.status(200).json({ message: "User liked successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const dislikeUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    const targetUserId = req.params.targetUserId;

    if (userId === targetUserId)
      return res.status(400).json({ message: "You can't dislike yourself" });

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (
      user.likedUsers.includes(targetUserId) ||
      user.dislikedUsers.includes(targetUserId)
    ) {
      return res
        .status(400)
        .json({ message: "User already liked or disliked" });
    }

    user.dislikedUsers.push(targetUserId);
    await user.save();

    res.status(200).json({ message: "User disliked successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { likeUser, dislikeUser };
