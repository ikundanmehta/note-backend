const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  createdBy: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const NotesSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
      minLength: 5,
    },
    createdBy: {
      type: String,
      required: true,
    },
    createrName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      minLenght: 3,
    },
    priority: {
      type: String,
      required: true,
      enum: ["easy", "medium", "hard"],
    },
    comments: {
      type: [CommentSchema],
      default: [],
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    privateAccess: {
      type: [String],
      default: [],
    },
    permissions: {
      type: String,
      enum: ["read", "admin", "none"],
      default: "none",
    },
    likes: {
      type: [String],
      default: [],
    },
    dislikes: {
      type: [String],
      default: [],
    },
    saved: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);
module.exports = mongoose.model("note", NotesSchema);
