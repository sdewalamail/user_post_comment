const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const User = require("../model/user");

const generateToken = async (req, res, next) => {

  try {
 
          if(req.validationError){
            return next()
        };

    const user = await User.findOne({ email: req.body.email });
      
    if (user == null) return res.status(401).json({ status: 401, message: "Invalid email or password" });
      
    // const hashedPassword = await bcrypt.hash(req.body.password, 10);
      
              // console.log(user.password, hashedPassword);

    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    console.log(isValidPassword);
    //  console.log(hashedPassword, user.password);    

    if (!isValidPassword){
      return res.status(401).json({ passwordError: "Password is incorrect" });
    }

    if (isValidPassword) {
      const token =  await jwt.sign (
        { email: user.email, role: user.role, password:user.password},
         process.env.SECRET_KEY,
        { algorithm: "HS256", expiresIn: process.env.JWT_EXPIRES_IN }
        
        );
        req.token = `Bearer ${token}`; 
    }

    // console.log(token);
    next();
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: `Unauthorized` });
  }
};


module.exports = generateToken;