const express = require('express');
const router = express.Router();
const passport = require('passport');


const isAuth = require('../middleware/checkUserRole');
const {ADMIN,USER} =  require('../helper/roles');
const {POST_CONTROLLER} = require('../controller');
const bodyValidator = require("../middleware/joiBodyValidator");
const postSchema = require('../validation/post');
const {obejectIdValidationSchema} = require('../validation/objectIdValidation');

const {getPost, createPost, deletePost,updatePost} = POST_CONTROLLER;



 // ::::::::: Post Create / Read / Update / Delete ::::::::::::::

 router.get('/', isAuth([ADMIN,USER]) ,getPost);
 router.post('/create',isAuth([ADMIN,USER]),createPost);
 router.delete('/delete/:id', isAuth([ADMIN,USER]), bodyValidator(obejectIdValidationSchema,"path"), deletePost );
 router.put('/update/:id',isAuth([ADMIN, USER]), bodyValidator(obejectIdValidationSchema,"path"), bodyValidator(postSchema), updatePost );



 module.exports = router;