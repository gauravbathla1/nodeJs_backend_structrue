"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const LogTypeContant_1 = require("../../constants/LogTypeContant");
const UserModel_1 = require("../../models/UserModel");
const Auth_1 = require("../../utils/Auth");
const { v4: uuidv4 } = require('uuid');
class AuthService {
    constructor() { }
    socialSignUp(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield UserModel_1.default.findOne({
                $or: [
                    { email: payload.email },
                    { facebook_info: { social_id: payload.social_id } },
                    { google_info: { social_id: payload.social_id } },
                ],
            });
            if (result) {
                let account = checkAccountType(payload.type, result);
                if (payload.type === LogTypeContant_1.LOGIN_TYPE.facebook) {
                    result.facebook_info = {
                        social_id: payload.social_id,
                        social_token: payload.social_token,
                    };
                }
                if (payload.type === LogTypeContant_1.LOGIN_TYPE.google) {
                    result.google_info = {
                        social_id: payload.social_id,
                        social_token: payload.social_token,
                    };
                }
                if (payload.type === LogTypeContant_1.LOGIN_TYPE.apple) {
                    result.apple_info = {
                        social_id: payload.social_id,
                        social_token: payload.social_token,
                    };
                }
                if (account) {
                    result.account_type.push(payload.type);
                }
                else {
                }
                result.name = payload.name ? payload.name : result.name;
                result.account_status = "VERIFIED";
                let token = yield Auth_1.Auth.getToken({ _id: result._id, email: result.email, userType: "user" }, "120d");
                result.device_info = [
                    {
                        jwt_token: token,
                    },
                ];
                yield result.save();
                return { token, name: result.name,
                    userId: result._id,
                    email: result === null || result === void 0 ? void 0 : result.email
                };
            }
            else {
                let facebook_info;
                if (payload.type === LogTypeContant_1.LOGIN_TYPE.facebook) {
                    facebook_info = {
                        social_id: payload.social_id,
                        social_token: payload.social_token,
                    };
                }
                let google_info;
                if (payload.type === LogTypeContant_1.LOGIN_TYPE.google) {
                    google_info = {
                        social_id: payload.social_id,
                        social_token: payload.social_token,
                    };
                }
                let apple_info = {};
                if (payload.type === LogTypeContant_1.LOGIN_TYPE.apple) {
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
                let user = yield new UserModel_1.default(userData).save();
                let token = yield Auth_1.Auth.getToken({ _id: user._id, email: user.email, userType: "user" }, "120d");
                yield user.save();
                user.password = null;
                const data = {
                    token: token,
                    name: user === null || user === void 0 ? void 0 : user.name,
                    userId: user._id,
                    email: user === null || user === void 0 ? void 0 : user.email
                };
                return data;
                // await Nodemailer.sendEmail(user.email, "Welcome to Yoodle!", "What will you write today?", '', '', 'welcome', { link: 'https://api-dev.yoodle.app/api/app/auth/email-unsubscribe?id=' + user._id })
                // return _RS.recordCreated(res, "Login successful", "SUCCESS", data);
            }
            function checkAccountType(account_type, user) {
                return __awaiter(this, void 0, void 0, function* () {
                    user.account_type = user.account_type.filter((element) => {
                        return element != account_type;
                    });
                });
            }
        });
    }
    guestLogin(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            let deviceId = payload.deviceId;
            let user = yield UserModel_1.default.findOne({ deviceId: deviceId });
            if (!user) {
                let option = {
                    deviceId: payload === null || payload === void 0 ? void 0 : payload.deviceId,
                    guestId: uuidv4()
                };
                let guest = new UserModel_1.default(option);
                guest = yield guest.save();
                console.log(guest, "guest");
                let token = yield Auth_1.Auth.getToken({ email: "", userType: "guest", _id: guest === null || guest === void 0 ? void 0 : guest._id }, '180d');
                return { user: guest, token: token };
            }
            let token = yield Auth_1.Auth.getToken({ _id: user._id, email: user === null || user === void 0 ? void 0 : user.email, userType: "guest" }, "120d");
            // return _RS.ok(res, "Login successful", 'SUCCESS', {
            //   user: user,
            //   jwt_token: token,
            // });
            return { token };
        });
    }
    generateGuestUserID() {
        return uuidv4();
    }
}
const UserAuthService = new AuthService(); // Create an instance of categoryService
exports.default = UserAuthService;
