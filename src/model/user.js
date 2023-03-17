const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

 // Password123!

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
      default: 'user'
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
      // select: false
    },
    userName: String,
    isActive: { type:Boolean, default:true},
    post: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "post"
    }],
    isDeleted: { type: Boolean},
    deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: "_id"},
    deletedAt: { type: Date, default: null },
    isAdmin: {type: Boolean, default: false},
  },

  { timestamps: true, autoIndex: true}
);


  // Hooks   Model middleware 

userSchema.pre('save', async function (next, docs) {

  // console.log("called pre hook::::::::: ");

  if (!this.isModified("password")) {
    next();
    return;
  }

  const user = this;

  try {
    const hasedPassword = await bcrypt.hash(user.password, 10);
    user.password = hasedPassword;
    return next();
  } catch (error) {
    return next(error);
  }
});


userSchema.index({"email": 1, "role": 1}, {unique: true})

const usersSchema = mongoose.model("User", userSchema);


// ensure the unique index is created every time the API is started
usersSchema.ensureIndexes();

module.exports = usersSchema;
