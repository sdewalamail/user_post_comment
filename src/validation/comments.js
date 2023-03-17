
const Joi = require('joi');



const commentSchema = Joi.object({

    text: Joi.string().required().min(2)
});


module.exports = commentSchema