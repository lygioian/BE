import User from "../models/user";
import bcrypt from 'bcryptjs';
var jwt = require("jwt-simple");
var secret = "aaaa";
class UserService {

  async create(data) {
    const user = await User.create(data);
    return user;
  }

  async login(username, password) {
    try {
      const user = await User.findOne({ username });
      // console.log(user);
      if (!user) {
        return {
          error: "Username is not exist!",
          success: false,
          code: 401
        };
      }
      // Check if password matches
      const isMatch = await bcrypt.compare(password, user.password);
      // console.log(isMatch);
      if (!isMatch) {
        return {
          error: "Invalid credentials",
          success: false,
          code: 401
        };
      }
      const token = jwt.encode({ _id: user._id }, secret);
      // console.log(token);
      return { token, success: true, code: 200 };
    } catch (err) {
      return { err, code: 400, success: false };
    }
  }

  async getAll() {
    const users = await User.find();
    return users;
  }

  async   getById(id) {
    const user = await User.findById(id);
    return user;
  }
  
  // async changePassword(userId, curPass, newPass){
  //   const salt = await bcrypt.genSalt(10);
  //   newPass = await bcrypt.hash(newPass, salt);
  //   const user = await User.findByIdAndUpdate(userId, {password: newPass});
  //   return user;
  // }

  async update(id, data){
    const user = await User.findByIdAndUpdate(id, data,{
      new: true,
      runValidators: true
    });
    return user;
  }

  async getUserRole(id) {
    try {
        const user = await this.getById(id);
        if (!user) {   
            return {
                error: "Id is not exist!",
                success: false,
                code: 401
            };
        }
        return user.role;
    } catch(err){
        console.log(err);
    }   
  } 


}

export default new UserService();
