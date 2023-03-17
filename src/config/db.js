
const mongoose = require('mongoose');

 const deprecation = {
    useNewUrlParser: true,      // Use new connection logic
    useUnifiedTopology: true,   // Use new server discovery and monitoring engine
  };
  

   module.exports = async () => {
         
       try {  await mongoose.connect(process.env.DB_CONNECTION, deprecation)}
       catch (error) {
                   throw new Error(error);
                  //  console.log(error);
                   process.exit(1);

               }
    }