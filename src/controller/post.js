const Post = require("../model/post");
const User = require("../model/user");
const Comment = require("../model/comment");

const {createPayload,createPayloadForArray} = require("../helper/createPayload");

// :::::::::::  Posts Logic :::::::::::

// :::::::::::  Get Routes :::::::::::::::::::
const getPost = async (req, res) => {
  try {

   const posts = await Post.find()
      .populate({path:'author', select: ' -_id -role -post -password -deletedAt -isAdmin -createdAt -updatedAt -__v -isActive'})
      .populate({path:'comments', match:{isDeleted: false} , select: 'text authorId -_id'});

      if(!posts){
         return res.json({status: 404 , message: "Post is not found or something went wrong!"})
      };

    res.status(200).json( {post: createPayloadForArray(posts) } );

  } catch (error) {
    console.log(error);
    res.status(500).json({status:500, message:"Internal server error"})
  };
};

// :::::::::::  create post Routes :::::::::::::::::::
const createPost = async (req, res) => {
  
  const { body, user } = req;
  try {

    const post = await new Post({...body, author: user._id }).save();
    if (post) await User.findByIdAndUpdate(user._id, {$push: {post:post._id} });
      
    res.json({ message: "Post successfully submitted", data: createPayload(post) });

  }catch (error) {
     console.log(error);
    res.status(500).json({status:500, message:"Internal server error"})
  };
};



// :::::::::::  update post Routes :::::::::::::::::::

const updatePost = async (req, res) => {
  const { params, body, user } = req;

  try {
     const post = await Post.findById(params.id).lean();

    if(!post) return res.json("post not found");

    if (user.role == "admin" || user.isAdmin ||  (String(user._id) == String(post.author)) ) {
      const updatedPost = await Post.findOneAndUpdate({_id: params.id}, {$set:{updatedBy: user._id, ...body} }, {new: true}).lean();
    return res
        .status(200)
        .json({ message: "Post updated successfully", updateUser: createPayload(updatedPost)});
    };

    return res.json({ error: "User not be updated" });

  } catch (error) {
   res.status(404).json({status: 404,  message: "Bad request! "});
  }
};

// :::::::::::  Delete Post :::::::::::::::::::

const deletePost = async (req, res) => {
  const { params, user } = req;
   try {
     const post = await Post.findOne({_id: params.id, isDeleted:false}, {title:1, description:1, author:1});
 
     if(!post)  return res.status(404).json({ status: 404 , message: "Post not found" });
 
     if ( user.role == "admin" || user.isAdmin || (String(post.author) == String(user._id)) ) {      
       await Post.findByIdAndUpdate( post.id, {$set:{isDeleted: true,deletedBy: user._id, deletedAt: new Date()}},{new:true}).lean();
       await Comment.updateMany({postId:post._id},{$set:{isDeleted:true,deletedAt:new Date(), deletedBy: user._id}})
        return res.json({ message: "Deleted Successfully", post: createPayload(post)});
     };
 
     return res.status(401).json({ status: 401 , message: "you are not authorized user to perform this operation" });
     
   } catch (error) {
 
     res.status(400).json({status:400, message: "Bad request!"})
   }
};

module.exports = { getPost, createPost, deletePost, updatePost };
