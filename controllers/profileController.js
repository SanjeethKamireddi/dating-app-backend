const User = require("../models/User");

const createOrUpdateProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const {
      name,
      phone,
      gender,
      dob,
      travelInterests,
      preferredGender,
      preferredMinAge,
      preferredMaxAge,
      latitude,
      longitude,
    } = req.body;

    const update = {
      name,
      phone,
      gender,
      dob,
      travelInterests: travelInterests ? travelInterests.split(",") : [],
      preferredGender,
      preferredMinAge,
      preferredMaxAge,
      location: {
        type: "Point",
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
      },
    };

    if (req.file) {
      update.profilePicture = req.file.filename;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: update },
      { new: true, upsert: true }
    );

    res
      .status(200)
      .json({ message: "Profile created/updated", profile: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const getMatches = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { gender, minAge = 18, maxAge = 100, page = 1 } = req.query;

    const currentUser = await User.findById(userId);
    if (!currentUser || !currentUser.location || !currentUser.dob) {
      return res
        .status(400)
        .json({ message: "User profile incomplete for matchmaking" });
    }

    const today = new Date();
    const minDob = new Date(
      today.getFullYear() - maxAge,
      today.getMonth(),
      today.getDate()
    );
    const maxDob = new Date(
      today.getFullYear() - minAge,
      today.getMonth(),
      today.getDate()
    );

    const seenUsers = [
      ...currentUser.likedUsers,
      ...currentUser.dislikedUsers,
      ...currentUser.matches,
      currentUser._id,
    ];

    const query = {
      _id: { $nin: seenUsers },
      location: {
        $near: {
          $geometry: currentUser.location,
          $maxDistance: 30000,
        },
      },
      dob: { $gte: minDob, $lte: maxDob },
    };

    if (gender) {
      query.gender = gender;
    }

    const matches = await User.find(query)
      .skip((page - 1) * 10)
      .limit(10);

    res.status(200).json({ matches });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getMutualMatches = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate(
      "matches",
      "-password"
    );

    res.status(200).json({ matches: user.matches });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const toggleOnlineStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isOnline = req.body.isOnline;
    await user.save();

    console.log(
      `User ${user.name} is now ${user.isOnline ? "online" : "offline"}`
    );

    res
      .status(200)
      .json({ message: "Status updated", isOnline: user.isOnline });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const uploadProfilePicture = async (req, res) => {
  try {
    const userId = req.user.userId;
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const imagePath = req.file.path;
    const user = await User.findByIdAndUpdate(
      userId,
      { profilePicture: imagePath },
      { new: true }
    );

    res.status(200).json({ message: "Profile picture updated", user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createOrUpdateProfile,
  getMatches,
  getMyProfile,
  getMutualMatches,
  toggleOnlineStatus,
  uploadProfilePicture,
};
