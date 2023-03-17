const Joi = require('joi');




const post = Joi.object({
    "title": Joi.string().required(),
    "description": Joi.string().required(),
    "isDeleted": Joi.boolean(),

});




module.exports = post;