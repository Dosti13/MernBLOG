const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        default: 'Normal'
    }

},{timestamps:true})
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      return next();
    }
    try {
      const saltRounds = 10; 
      const hashedPassword = await bcrypt.hash(this.password, saltRounds);
      this.password = hashedPassword;
      next();
    } catch (err) {
      next(err);
    }
  });
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };
const User = mongoose.model("User",UserSchema)

module.exports = User 