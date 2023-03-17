const express = require('express');
const router = express.Router();
const passport = require('passport');


const isAuth = require('../middleware/checkUserRole');
const {ADMIN,USER} =  require('../helper/roles');
const jwtAuth =  passport.authenticate('jwt',{ session: false });
const {COMMENT_CONTROLLER} = require('../controller');
const {getComments, createComments, deleteComments,updateComments,getCommentsById} = COMMENT_CONTROLLER;
const {obejectIdValidationSchema,commentIdAndPostIdValidationSchema} = require('../validation/objectIdValidation');
const joiSchemaValidator = require('../middleware/joiBodyValidator');
const commentSchema = require('../validation/comments');

 // ::::::::: Comments Create / Read / Update / Delete ::::::::::::::
 router.get('/', isAuth([ADMIN]), jwtAuth ,getComments);
 router.get('/:postId', isAuth([ADMIN,USER]), joiSchemaValidator(obejectIdValidationSchema, "path"), joiSchemaValidator(commentSchema),getCommentsById);
 router.post('/create/:postId',isAuth([ADMIN,USER]),joiSchemaValidator(obejectIdValidationSchema, "path"),joiSchemaValidator(commentSchema),createComments);
 router.delete('/delete/:postId/:commentId', isAuth([ADMIN,USER]),joiSchemaValidator(commentIdAndPostIdValidationSchema,"path"),deleteComments );
 router.put('/update/:id', isAuth([ADMIN, USER]), joiSchemaValidator(obejectIdValidationSchema, "path"),joiSchemaValidator(commentSchema), updateComments);



 module.exports = router;