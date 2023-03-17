
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;

const User = require('../model/user');

 const jwtOption = {
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY,
 };

 const jwtStrategy = new JwtStrategy( jwtOption,  async(payload, done) => {

         try {

            const user =    await User.findOne({email:payload.email}, {comments:0, post:0}).lean();

            if(!user) return done(null, false); 

            const isValidPassword = user.password === payload.password;
            // console.log(user);

            if(isValidPassword) { return done(null, user) }
            else { return done(null, false) }
            
          } catch (error) {
            
            return done(null, false);
         }
 });


  module.exports = jwtStrategy;





 
