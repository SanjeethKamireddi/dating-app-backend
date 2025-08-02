const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: String,
  phone: String,
  gender: String,
  dob: Date,
  travelInterests: {
    type: [String],
    default: [],
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
  likedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  dislikedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  matches: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  preferredGender: {
    type: String,
  },
  preferredMinAge: {
    type: Number,
    default: 18,
  },
  preferredMaxAge: {
    type: Number,
    default: 100,
  },
});

userSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("User", userSchema);
