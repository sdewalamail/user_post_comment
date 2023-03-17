const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({

    "title": { type: String, required: true },
    "description": { type: String, required: true },
    "author":   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isDeleted:  { type: Boolean, default:false},
    deletedBy:  { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null},
    deletedAt:  { type: Date, default: null},
    updatedBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null},
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'comments'}]
  }, {timestamps:true});

  
  const Post = mongoose.model('post', postSchema);
  
  module.exports = Post;