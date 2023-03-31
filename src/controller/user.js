const bcrypt = require("bcrypt");

const User = require("../model/user");
const {createPayload} = require("../helper/createPayload");
const {sendEmail } = require("../helper/nodeMailer");
// :::::::::::  SignUp :::::::::::
const singUp = async (req, res) => {
  try {
    const { body } = req;
 
    const newUser = await new User(body).save();

    if(newUser?.role === 'admin' || newUser?.isAdmin) {
       newUser.isAdmin = true;
       newUser.role = 'admin';
       await newUser.save();
    };
      sendEmail({
      to: userPayload.email,
      subject: "Email verification",
      text: `You are registered successfully with us please verify your email by using this otp ${otp} .`,
    });

    res.status(200).send({ status:200, userCreated: createPayload(newUser)});

  } catch (error) {
    // console.log(error);
    if(error?.code === 11000) {
      return res.status(409).send({ status:409, "message": "User is already registered." });
    };

    console.log(error);

    res.status(400).send({ status:400, message: 'Bad requests!' });
  }
};
// :::::::::::  SignIn :::::::::::
const signIn = async (req, res) => {
  try {
    const { body } = req;
    const user = await User.findOne({ email: body.email });

  if (!user) return res.json ({
      "success": false,
      "message": "User not found. Please sign up to create a new account."
  });
    //  console.log(user)
    const invalidPassword = await bcrypt.compare(body.password, user.password);
    // console.log(invalidPassword);
  if(!invalidPassword)
   return res.json({ incorrectPassword: "Password Doest Not match" });

    res.json({ status: 200, "message": "Token generated successfully", token: req.token });

  } catch (error) {
    // console.log(error); 
     res.status(500).send({ satus: 500, message:"Something went wrong" });
  };
};

module.exports = { singUp, signIn };
