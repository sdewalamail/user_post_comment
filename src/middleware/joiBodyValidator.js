const errorMessages = require("../validation/joiValidatonErrorMessage");


const validateSchema = function(schema, toValidate = "body") {
  return function(req, res, next)  {
    let payload;
          if(toValidate === "body"){
            // console.log(":::::::::::::::::::::",toValidate,req.body);
            payload = req.body;
          }else if(toValidate === 'query'){
            payload =  req.query;
          }else if(toValidate === "path") {
            payload = req.params;
          };


    const options = {
      abortEarly: false,
      messages: errorMessages,
    };

    const validation = schema.validate(payload, options);
    
    if(validation.error){
      const errors = validation.error.details.map(detail => {
        const message = detail.message;
        return  message.replaceAll('"', '');
      });
      return res.status(422).json({
        status: 422,
        message: 'Invalid parameters',
        data: errors
      });
    } else {
      
      next();
    }
  }
};


module.exports = validateSchema;











// else {
//   try {
//     const user = await UserModel.findOne({ $or: [{ email: payload.email }, { phone: payload.phone }] });
//     if (user) {
//       return res.status(409).json({
//         status: 409,
//         message: 'User already registered',
//         data: { field: 'email,phone', message: 'Email or phone already registered' }
//       });
//     }
//     next();
//   } catch (error) {
//     return res.status(500).json({
//       status: 500,
//       message: 'Internal server error',
//       data: { field: '', message: error.message }
//     });
//   }
// }




// function makeValidationError(errors) {
// const error = [];
// for (const e of errors) {
//     error.push(e.message.replaceAll('"', ''));
// }

//   return error;
// };



