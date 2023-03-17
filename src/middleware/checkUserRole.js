
const passport = require('passport');
// const User = require("../model/user")

function checkAuthorization(roles) {
  return function(req, res, next) {

    passport.authenticate("jwt", { session: false }, (err, user, info) => {
      if (err || !user) {
        
        res.status(403).json({ data: {}, error: { message: "Unauthorized" } });
        
      } else {
        const userRoles = user.role || [];
        if (userRoles.includes("admin")) {
          req.user = user; 
           return next();

        } else if (roles) {

           const authorized = Array.isArray(roles)? roles.some((role) => userRoles.includes(role)): userRoles.includes(roles);
          
          if (authorized) {
            
           req.user = user;
            next();

          } else {
             res.status(401).json({ status:401, message: "You are unauthorized to do this!" });
          }
        } else {

          req.user = user;
          next();
        }
      }
    })(req, res, next);
  };
}



module.exports =  checkAuthorization;