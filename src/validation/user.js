const Joi = require('joi');

const role = require('../helper/roles');
const {ADMIN,USER} = role;

const signupValidator = Joi.object({
  "userName": Joi.string().min(3).max(50).required(),
  "email": Joi.string()
    .required()
    .pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  "password": Joi.string().min(2).max(18).required(),
  "role": Joi.string().valid(ADMIN,USER).messages({'any.only': "Role must be either user or admin"}),
  "isAdmin": Joi.boolean()

});

const loginValidator = Joi.object({
  "email": Joi.string()
    .required()
    .pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  "password": Joi.string().min(2).required()
})

  module.exports = {signupValidator, loginValidator};




  // const loginSchema = Joi.object({
//     email: Joi.string()
//       .required()
//       .pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
//       .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
//     password: Joi.string()
//       .required()
//       .pattern(
//         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
//       ),
//   });


// const signupSchema = Joi.object({
//     firstName: Joi.string().min(3),
//     lastName: Joi.string().min(3),
//     email: Joi.string()
//       .required()
//       .pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
//       .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
//     phoneNumber: Joi.string()
//       .required()
//       .min(10)
//       .pattern(/^[5-9]\d{9}$/),
//     designation: Joi.string().required(),
//     countryCode: Joi.string().required(),
//     password: Joi.string()
//       .required()
//       .pattern(
//         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
//       ),
//     repeat_password: Joi.ref("password"),
//   });
