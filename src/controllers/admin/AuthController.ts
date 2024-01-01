import { NextFunction } from "express";
import ResponseHelper from "../../helpers/ResponseHelper";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
import AdminModel from "../../models/AdminModel";
import AuthService from "../../services/admin/AuthService";
import { Auth } from "../../utils/Auth";

class AuthController {
   
  async login(req: ReqInterface, res: ResInterface, next: NextFunction) {
    try {
      const email = req.body.email;
      const password = req.body.password;

      const data = await AuthService.login(email, password, res, next);
      
      if (data)
        return ResponseHelper.ok(res, res.__("login_successfully"), data);
    } catch (error) {
      next(error);
    }
  }

   

  async changePassword(
    req: ReqInterface,
    res: ResInterface,
    next: NextFunction
  ) {
    try {
      const passwordCurrent = req.body.passwordCurrent;
      const password = req.body.password;

      const admin: any = await AdminModel.findById(req.admin._id);

      const isPasswordCurrentCorrect = await new Auth().comparePassword(passwordCurrent, admin.password);

      if (!isPasswordCurrentCorrect) {
        return ResponseHelper.badRequest(res, res.__("incorrect_password"));
      }

      const encryptedPassword = await new Auth().encryptPassword(password);

      admin.password = encryptedPassword;
      await admin.save();

      res.logMsg = "Admin password changed successfully";

      return ResponseHelper.ok(res, res.__("admin_password_changed"), {});
    } catch (err) {
      next(err);
    }
  }

   async forgetPassword(
    req: ReqInterface,
    res: ResInterface,
    next: NextFunction
  ) {
    const { email } = req.body;
    try {
      let user = await AdminModel.findOne({ email }).select("+password");
      if (!user) {
        return ResponseHelper.badRequest(
          res,
          "Please check the provided email",
          "SUCCESS"
        );
      } else {
        let otp_expiry = Date.now() + 5 * 60000;
        const val = Math.floor(1000 + Math.random() * 9000);
        user.otp_expiry = otp_expiry
        user.otp = val
        user.save();
        let token = await Auth.getToken(
          { id: user._id, email: user.email },
          "1d"
        );
        // let link = "https://admin.yoodle.app/#/new-password/":"https://admin-staging.yoodle.app/#/new-password/" + key, "gaurav", "forgot"
        let link = `http://localhost:4200/#/new-password?token=${token}`
       
        return ResponseHelper.ok(res, "Email Verification sent.", {link});
      }
    } catch (error) {
      next(error);
    }
  }

   async verifyLink(
    req: ReqInterface,
    res: ResInterface,
    next: NextFunction
  ) {
    try {
      let id = req.admin?._id;
      // let otp = req.body.otp;
      let admin: any = await AdminModel.findOne({ _id: id });
      if (admin != null) {
        if (admin.otp_expiry < Date.now()) {
          return ResponseHelper.badRequest(res, "Link is expired", {});
        }
       return ResponseHelper.ok(res, "Otp Verified", {});
      }
      return ResponseHelper.badRequest(res, "Link is expired", {});
    } catch (e) {
      next(e)
    }
  }

   async resetPassword(req:ReqInterface, res:ResInterface, next:NextFunction) {
    try {
      let userId = req.admin._id;
      let user = await AdminModel.findOne({
        _id: userId,
      });
      console.log(user,"usususu")
      if (user != null) {

        user.password = await new Auth().encryptPassword(req.body.newPassword);
        user.otp = null;
        user.otp_expiry = null;
        await user.save();
        // return ResponseHelper.ok(res, "Password changed successfully.", "SUCCESS");
      return ResponseHelper.ok(res, res.__("Password changed successfully"), {});

      }
    } catch (e) {
      console.log(e);

      next(e);
    }
  };

  
}

export default new AuthController();
