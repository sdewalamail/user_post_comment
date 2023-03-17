const express = require('express');
const router = express.Router();

const user = require('./users');
const post = require('./post');
const comment = require('./comments');

router.use('/', user);
router.use('/posts', post);
router.use('/comments', comment);


/* GET home page. */


module.exports = router;
