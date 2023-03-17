const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({

  text: { type: String, required: true },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default:null },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "post", default:null },
  isDeleted: { type: Boolean, default: false},
  deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
  deletedAt: { type: Date, default: null },
  updatedBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
  // replies: [this] // Array of nested comments
}, {timestamps:true});

const comments = mongoose.model("comments", commentSchema);

module.exports = comments;
