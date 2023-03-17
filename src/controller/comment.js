const Comments = require('../model/comment');
const Post = require('../model/post');
const User = require('../model/comment');

const {request, response} = require('express');
const {createPayloadForArray,createPayload} = require("../helper/createPayload")

// req = request, res = response

const getComments = async (req , res ) => { 

     try {
          const comments =  await Comments.find({isDeleted:false})
          .populate({path:'postId', match:{isDeleted: false} , select: 'title description -_id', populate:{path:"author", select: 'userName -_id'}});
          
          res.status(200).json({status:200, comments:createPayloadForArray(comments)});

     }catch (error) {
       res.status(404).json({status:400, message:"Bad request!"});  
     }
   
};

const getCommentsById = async (req , res ) => { 

     try {
          const postId = req.params.postId;

          const comments =  await Comments.findOne({postId: postId,isDeleted:false})
          .populate({path:'postId', match:{isDeleted: false} , select: 'title description -_id', populate:{path:"author", select: 'userName -_id'}});
          
          res.status(200).json({status:200, comments:createPayloadForArray(comments)});
     } catch (error) {
           console.log(error);
          res.status(404).json({status:400, message:"Bad request!"});  
          
     }
   
};

const createComments = async (req , res ) => {
     const {params, body} =  req;
     try {
          
          const post = await Post.findOne({_id:params.postId, isDeleted:false});
          if(!post) return res.status(404).json({satus:404, message:"Post not found you can't create any comments"});

          const comment = await new Comments({ ...body, authorId: post.author, postId : post._id  }).save();
          await Post.findByIdAndUpdate(post._id, {$push:{comments: comment._id}}).lean();
          res.status(200).json({message:"Comment Added Successfully", comment:createPayload(comment) });

     }catch (error) {
       res.status(404).json({status:400, message:"Bad request!"});
       
     };
};

// User/Admin can Update  the Comments 
const updateComments = async (req , res) => {
     const {params, body, user} = req;
     
     try {
     const comment = await Comments.findOne({_id:params.id, isDeleted:false});
     if(!comment)  return res.status(404).json({status: 404, "message": "comments not Found!"});
    
     if (user.role === 'admin' || user.isAdmin || (String(comment.authorId) === String(user._id)) ) {
          const updatedComment = await Comments.findByIdAndUpdate(
            comment._id,
            { $set: { updatedBy: user._id, ...body } },
            { new: true }
          );
          res.status(200).json({ message: "Comment updated successfully", data: createPayload(updatedComment) });
     } else {
          const post = await Post.findById(comment.postId);
          if (post && post.author === user._id) {
            const updatedComment = await Comments.findByIdAndUpdate(
              comment._id,
              { $set: { updatedBy: user._id, ...body } },
              { new: true }
            ).lean();
            res.status(200).json({status:401, message: "Comment updated successfully", data:createPayload(updatedComment) });
          } else {
            res.status(401).json({ status:401, message: "You are not authorized to update this comment" });
          }
      };

         res.status(200).json({ status : 401 , message:"Comment Not Updated Something happen wrong"});         
      
     } catch (error) {

          res.status(404).json({status:400, message:"Bad request!"});
     } 

};

 // User/Admin can delete the Comments 
const deleteComments = async (req = request, res = response) => {

     const {params, user} = req;

     try {

     const post =  await Post.findById(params.postId);
     const comment = await Comments.findById(params.commentId);

      if(user.role === 'admin' || user.isAdmin || (String(comment.authorId) === String(user._id))  || post.author === user._id ){   
          const  deletedComment =   await Comments.findByIdAndUpdate(comment._id,
                {$set: {isDeleted:true, deletedBy:user._id, deletedAt:new Date() }}, 
                {new:true}).lean();
          return res.status(200).json({ status: 200 , message:"delete successfully",data: createPayload(deletedComment)})
        };
          
      res.status(403).json({status:403, message:"You are not authorize user to perform this action"})
          
     } catch (error) {
          
          res.status(404).json({status:400, message:"Bad request!"});
     }
     
}; 

module.exports = { getComments, createComments, deleteComments, updateComments,getCommentsById };
