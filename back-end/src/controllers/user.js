import UserService from "../services/user";
import bcrypt from 'bcryptjs';

class UserController {
  
  async create(req,res) {
    try {
        const user = await UserService.create({...req.body, createdAt: new Date()});
        return res.status(200).json({success: true, data: user});
    } catch (err){
        console.log(err);
        return res.status(400).json({success: false, message: "Username existed"});
    }
  }

  async login(req, res) {
    try {
      const user = await UserService.login(req.body.username, req.body.password);

      return res.status(200).json({ data: user });
    } catch (err) {
      return res.status(400).json({ success: false, err });
    }
  }

  async getAll(req, res) {
    try {
      const products = await UserService.getAll();
      return res.status(200).json({ success: true, data: products });
    } catch (err) {
      return res.status(400).json({ success: false });
    }
  }

  async getById(req, res) {
    try {
      const user = await UserService.getById(req.params.id);

      return res.status(200).json({ success: true, data: user });
    } catch (err) {
      return res.status(400).json({ success: false });
    }
  }

  async changePassword(req, res) {
    try {
      const userID = req.payload._id;
      const user = await UserService.getById(userID);
      if (!user){
        return res.status(401).json({
          success: false,
          message: "User doesn't exist"
        })
      }
      const isMatch = await bcrypt.compare(req.body.curPassword, user.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Your password is incorrect"
        })
      }
      if (!(req.body.newPassword == req.body.confirmPassword)) {
        return res.status(401).json({
          success: false,
          message: "Your new password is incorrect"
        })
      }
      user.password = req.body.newPassword;
      await user.save();
      return res.status(200).json({ success: true, data: user });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ success: false });
    }
  }

  async update(req,res) {
    try {
        const user = await UserService.update(req.params.id, req.body);

        return res.status(200).json({success:true, data: user});
    } catch(err){
        return res.status(400).json({success: false})
    }
  }

}

export default new UserController();
