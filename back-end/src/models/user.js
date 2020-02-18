const mongoose = require("mongoose");
import bcrypt from 'bcryptjs';

var userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Username cannot blank"],
    trim: true
  },
  password: {
    type: String,
    required: [true, "password name cannot blank"]
  },
  name: {
    type: String,
    required: [true, "name cannot blank"]
  },
  phone: {
    type: Number,
    // required: [true, "phone cannot blank"]
  },
  email: {
    type: String,
    required: [true, "email cannot blank"]
  },
  gender: {
    type: String,
    // required: [true, "gender cannot blank"]
  },
  role: { //Student, Teacher, Admin, SuperAdmin
    type: String,
    required: [true]
  },
  createdAt: {
    type: Number,
    default: null
  }
});

// userSchema.methods.comparePassword = function (curPassword) {
//   const user = this;
//   return new Promise((resolve, reject) => {
//     bcrypt.compare(curPassword,user.password,(err,isMatch) => {
//       if(err) {
//         return reject(err);
//       }
//       if(!isMatch){
//         return reject(false);
//       }
//       resolve(true);
//     })
//   })
// }

// userSchema.methods.changePassword = async function (newPassword) {
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(newPassword,salt);
// }

userSchema.pre("save", async function(next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


export default mongoose.model("user", userSchema);
