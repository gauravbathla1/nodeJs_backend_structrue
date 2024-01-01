import { LOGIN_TYPE } from "../../constants/LogTypeContant";
import UserModel from "../../models/UserModel";
import { Auth } from "../../utils/Auth";
const { v4: uuidv4 } = require('uuid');

class AuthService {
  constructor() {}

  async socialSignUp(payload: any) {
    let result: any = await UserModel.findOne({
      $or: [
        { email: payload.email },
        { facebook_info: { social_id: payload.social_id } },
        { google_info: { social_id: payload.social_id } },
      ],
    });
    if (result) {
      let account = checkAccountType(payload.type, result);
      if (payload.type === LOGIN_TYPE.facebook) {
        result.facebook_info = {
          social_id: payload.social_id,
          social_token: payload.social_token,
        };
      }
      if (payload.type === LOGIN_TYPE.google) {
        result.google_info = {
          social_id: payload.social_id,
          social_token: payload.social_token,
        };
      }
      if (payload.type === LOGIN_TYPE.apple) {
        result.apple_info = {
          social_id: payload.social_id,
          social_token: payload.social_token,
        };
      }
      if (account) {
        result.account_type.push(payload.type);
      } else {
      }
      result.name = payload.name ? payload.name : result.name;
      result.account_status = "VERIFIED";
      let token = await Auth.getToken(
        { _id: result._id, email: result.email,userType:"user" },
        "120d"
      );
      result.device_info = [
        {
          jwt_token: token,
        },
      ];
       await result.save();
      return {  token,name: result.name,
        userId: result._id,
        email:result?.email
      };
    } else {
      let facebook_info: any;
      if (payload.type === LOGIN_TYPE.facebook) {
        facebook_info = {
          social_id: payload.social_id,
          social_token: payload.social_token,
        };
      }
      let google_info: any;
      if (payload.type === LOGIN_TYPE.google) {
        google_info = {
          social_id: payload.social_id,
          social_token: payload.social_token,
        };
      }
      let apple_info: any = {};
      if (payload.type === LOGIN_TYPE.apple) {
        apple_info = {
          social_id: payload.social_id,
          social_token: payload.social_token,
        };
      }
      let userData = {
        is_active: true,
        email: payload.email,
        name: payload.name,
        account_type: payload.type,
        apple_info: apple_info,
        facebook_info: facebook_info,
        google_info: google_info,
        last_login: Math.round(new Date().getTime()),
      };
      let user: any = await new UserModel(userData).save();
      let token = await Auth.getToken(
        { _id: user._id, email: user.email ,userType:"user" },
        "120d"
      );
      await user.save();
      user.password = null;
      const data = {
        token: token,
        name: user?.name,
        userId: user._id,
        email:user?.email
      };
      return data;
      // await Nodemailer.sendEmail(user.email, "Welcome to Yoodle!", "What will you write today?", '', '', 'welcome', { link: 'https://api-dev.yoodle.app/api/app/auth/email-unsubscribe?id=' + user._id })
      // return _RS.recordCreated(res, "Login successful", "SUCCESS", data);
    }

    async function checkAccountType(account_type: any, user: any) {
      user.account_type = user.account_type.filter((element: any) => {
        return element != account_type;
      });
    }
  }

  async guestLogin(payload: any) {
    let deviceId = payload.deviceId;
    let user = await UserModel.findOne({ deviceId: deviceId });
    if (!user) {
        let option = {
            deviceId:payload?.deviceId,
            guestId:uuidv4()
        }
        let guest = new UserModel(option);
        guest = await guest.save();
        console.log(guest,"guest");
        let token = await Auth.getToken({email:"",userType:"guest",_id:guest?._id},'180d');
        return {user:guest,token:token}
    }
    let token = await Auth.getToken(
      { _id: user._id, email: user?.email, userType:"guest"},
      "120d"
    );

    // return _RS.ok(res, "Login successful", 'SUCCESS', {
    //   user: user,
    //   jwt_token: token,
    // });
    return {token };
  }

  generateGuestUserID() {
    return uuidv4();
  }
}
const UserAuthService = new AuthService(); // Create an instance of categoryService

export default UserAuthService;
