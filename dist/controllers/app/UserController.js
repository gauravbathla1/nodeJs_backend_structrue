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
const ResponseHelper_1 = require("../../helpers/ResponseHelper");
const UserModel_1 = require("../../models/UserModel");
const UserService_1 = require("../../services/app/UserService");
const Auth_1 = require("../../utils/Auth");
const LogoModel_1 = require("../../models/LogoModel");
const SpeakerModel_1 = require("../../models/SpeakerModel");
const ContactUsModel_1 = require("../../models/ContactUsModel");
class UserController {
    /**
            * @api {patch} api/v1/app/user/edit-profile Edit Profile
            * @apiHeader {String} App-Version Version Code 1.0.0.
            * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
            * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMu
            * @apiVersion 1.0.0
            * @apiVersion 1.0.0
            * @apiName edit-profile
            * @apiGroup App-User
            * @apiDescription request body send as form data
            *
            * @apiParam {File} [profilePic] user profile pic
            * @apiParam {String} firstName
            * @apiParam {String} lastName
            * @apiParam {String} displayName
            * @apiParam {String} email
            * @apiParam {String} accountNo
            * @apiParam {String} paypalEmail
            * @apiParam {String} description
            *
            *
            * @apiSuccessExample {json} Profile-updated
            * {
            *        "status": 200,
            *        "statusText": "SUCCESS",
            *        "message": "UserProfile added successfully",
            *        "data": {
            *            "user": {
            *                "_id": "62dfcb21fb89c4b45de44685",
            *                "email": "najariya.query@gmail.com",
            *                "isEmailVerified": true,
            *                "isAccountActive": true,
            *                "__v": 0,
            *                "currentDeviceType": "IOS",
            *                "accountNumber": 20231949278,
            *                "avatar": "user-profiles/1659434425401-test3.jpeg",
            *                "description": "asdfghjkl",
            *                "displayName": "ASDF",
            *                "firstName": "pukhraj",
            *                "lastName": "saini",
            *                "name": "pukhraj saini",
            *                "paypalEmail": "pukhraj.saini97@gmail.com",
            *                "changedEmail": "pukhraj.query@gmail.com"
            *            },
            *            "isEmailChanged": false,
            *            "execTime": 326
            *        }
            *    }
            *
            * @apiSuccessExample {json} Profile updated and Email Changed
            * {
            *            "status": 201,
            *            "statusText": "EMAIL_CHANGED",
            *            "message": "profile updated and Verification link sent successfully on your mail",
            *            "data": {
            *                "user": {
            *                    "_id": "62dfcb21fb89c4b45de44685",
            *                    "email": "najariya.query@gmail.com",
            *                    "isEmailVerified": true,
            *                    "isAccountActive": true,
            *                    "__v": 0,
            *                    "currentDeviceType": "IOS",
            *                    "accountNumber": 20231949278,
            *                    "avatar": "user-profiles/1659434425401-test3.jpeg",
            *                    "description": "asdfghjkl",
            *                    "displayName": "ASDF",
            *                    "firstName": "pukhraj",
            *                    "lastName": "saini",
            *                    "name": "pukhraj saini",
            *                    "paypalEmail": "pukhraj.saini97@gmail.com",
            *                    "changedEmail": "pukhraj.query@gmail.com"
            *                },
            *                "isEmailChanged": true,
            *                "execTime": 812
            *            }
            *        }
            *
            * @apiErrorExample {json} Error-Response CONFLICT
            * {
            *        "status": 409,
            *        "statusText": "CONFLICT",
            *        "message": "User already exists",
            *        "data": {
            *            "user": {
            *                "name": "pukhraj saini",
            *                "firstName": "pukhraj",
            *                "lastName": "saini",
            *                "displayName": "ASDF",
            *                "email": "pukhraj@mailinator.com",
            *                "accountNumber": "20231949278",
            *                "paypalEmail": "pukhraj.saini97@gmail.com",
            *                "description": "asdfghjkl"
            *            }
            *        }
            *    }
            *
            */
    getSponserLogo(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let type = ((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.type) || 'main';
                let logo = yield LogoModel_1.default.find({ isActive: true, sponserType: type }).sort({ createdAt: -1 });
                return ResponseHelper_1.default.ok(res, res.__('Logo find successfully'), { logo });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getSpeaker(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let logo = yield SpeakerModel_1.default.find({ isActive: true });
                return ResponseHelper_1.default.ok(res, res.__('Logo find successfully'), { logo });
            }
            catch (error) {
                next(error);
            }
        });
    }
    ;
    // name , compony,jobtitle , isAttend , isSponser
    contactForm(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let payload = req === null || req === void 0 ? void 0 : req.body;
                let contact = yield new ContactUsModel_1.default(payload);
                yield contact.save();
                return ResponseHelper_1.default.ok(res, res.__('Added successfully'), {});
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
                * @api {patch} api/v1/app/user/verify-email Verify Email
                * @apiHeader {String} App-Version Version Code 1.0.0.
                * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
                * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMu
                * @apiVersion 1.0.0
                * @apiVersion 1.0.0
                * @apiName verify-email
                * @apiGroup App-User
                *
                * @apiParam {String} email
                * @apiParam {String} token email verification token
                *
                * @apiParamExample {json} Request-Body:
                *
                * {
                *        "email": "pukhraj47@mailinator.com",
                *        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.0YjQ1ZGU0NDY4NSIsInJv....
                *    }
                *
                * @apiSuccessExample {json} Success Response:
                * {
                *        "status": 200,
                *        "statusText": "SUCCESS",
                *        "message": "Email verified successfully",
                *        "data": {
                *            "user": {
                *                "_id": "62dfcb21fb89c4b45de44685",
                *                "email": "pukhraj47@mailinator.com",
                *                "isEmailVerified": true,
                *                "isAccountActive": true,
                *                "__v": 0,
                *                "currentDeviceType": "IOS",
                *                "accountNumber": 20231949728,
                *                "avatar": "user-profiles/1659512469817-pukhraj_saini_mce242.png",
                *                "description": "Mean stack developer",
                *                "displayName": "pk",
                *                "firstName": "puhraj",
                *                "lastName": "saini",
                *                "name": "puhraj saini",
                *                "paypalEmail": "pukhraj.saini97@gmai.com"
                *            },
                *            "execTime": 107
                *        }
                *    }
                *                    *
                * */
    verifyEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const email = req.body.email;
                const token = req.body.token;
                if (email !== user.changedEmail) {
                    return ResponseHelper_1.default.badRequest(res, res.__('invalid_email'));
                }
                const data = yield UserService_1.default.verifyEmail(user, email, token, res, next);
                if (data) {
                    res.logMsg = 'Email verified successfully';
                    return ResponseHelper_1.default.ok(res, res.__('email_verified'), data);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * @api {patch} api/v1/app/user/update-social Update Social
     * @apiHeader {String} App-Version Version Code 1.0.0.
     * @apiVersion 1.0.0
     * @apiName update-social
     * @apiGroup App-User
     * @apiParam {String} facebookProfileUrl
     * @apiParam {String} linkedinProfileUrl
     * @apiParam {String} twitterUsername
     * @apiParam {String} instagramUsername
     *
     *
     * @apiParamExample {json} Request-body
     * {
     *      "facebookProfileUrl": "https://www.facebook.com/pukhrajsaini",
     *      "linkedinProfileUrl": "https://www.linkedin.com/in/pukhrajsaini",
     *      "twitterUsername": "pukhrajsaini",
     *      "instagramUsername": "pukhrajsaini"
     *  }
     * @apiSuccessExample {json} Success-Response-1:
     * {
     *           "status": 200,
     *           "statusText": "SUCCESS",
     *           "message": "User social update successfully",
     *           "data": {
     *               "user": {
     *                   "_id": "62dfcb21fb89c4b45de44685",
     *                   "email": "pukhraj47@mailinator.com",
     *                   "isEmailVerified": true,
     *                   "isAccountActive": true,
     *                   "__v": 0,
     *                   "currentDeviceType": "IOS",
     *                   "accountNumber": 20231949728,
     *                   "avatar": "user-profiles/1659512469817-pukhraj_saini_mce242.png",
     *                   "description": "MEAN STACK DEVELOPER",
     *                   "displayName": "pk",
     *                   "firstName": "puhraj",
     *                   "lastName": "saini",
     *                   "name": "puhraj saini",
     *                   "paypalEmail": "pukhraj.saini97@gmai.com",
     *                   "facebookProfileUrl": "https://facebook.com/pukhrajsaini",
     *                   "instagramUsername": "pukhrajsaini",
     *                   "linkedinProfileUrl": "https://www.linkedin.com/in/pukhrajsaini",
     *                   "twitterUsername": "pukhrajsaini"
     *               },
     *               "execTime": 128
     *           }
     *       }
     *
     */
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user._id;
                const facebookProfileUrl = req.body.facebookProfileUrl;
                const linkedinProfileUrl = req.body.linkedinProfileUrl;
                const twitterUsername = req.body.twitterUsername;
                const instagramUsername = req.body.instagramUsername;
                const user = yield UserService_1.default.update(userId, facebookProfileUrl, linkedinProfileUrl, twitterUsername, instagramUsername);
                if (user) {
                    res.logMsg = 'Social updated successfully';
                    ResponseHelper_1.default.ok(res, res.__('user_social_update'), { user });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
               * @api {patch} api/v1/app/user/change-password Change Password
               * @apiHeader {String} App-Version Version Code 1.0.0.
               * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
               * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMu
               * @apiVersion 1.0.0
               * @apiVersion 1.0.0
               * @apiName change-password
               * @apiGroup App-User
               *
               * @apiParam {String} passwordCurrent current password of user
               * @apiParam {String} password new password
               *
               * @apiParamExample {json} Request-Body:
               *
               * {
               *        "password": "asdfghjkl",
               *        "passwordCurrent": "Test@123"
               *    }
               *
               * @apiSuccessExample {json} Success Response:
               * {
               *        "status": 200,
               *        "statusText": "SUCCESS",
               *        "message": "Password changed successfully",
               *        "data": {
               *            "user": {
               *                "_id": "62dfcb21fb89c4b45de44685",
               *                "email": "pukhraj47@mailinator.com",
               *                "isEmailVerified": true,
               *                "isAccountActive": true,
               *                "__v": 0,
               *                "currentDeviceType": "IOS",
               *                "accountNumber": 20231949728,
               *                "avatar": "user-profiles/1659512469817-pukhraj_saini_mce242.png",
               *                "description": "Mean stack developer",
               *                "displayName": "pk",
               *                "firstName": "puhraj",
               *                "lastName": "saini",
               *                "name": "puhraj saini",
               *                "paypalEmail": "pukhraj.saini97@gmai.com"
               *            },
               *            "execTime": 107
               *        }
               *    }
               *                    *
               * */
    changePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const passwordCurrent = req.body.passwordCurrent;
                const password = req.body.password;
                // const user = req.user;
                const user = yield UserModel_1.default.findById(req.user._id).select(['password']);
                if (passwordCurrent === password)
                    return ResponseHelper_1.default.badRequest(res, res.__('password_does_not_equal'));
                const isPasswordCurrentCorrect = yield new Auth_1.Auth().comparePassword(passwordCurrent, user.password);
                if (!isPasswordCurrentCorrect)
                    return ResponseHelper_1.default.badRequest(res, res.__('incorrect_password'));
                const encryptedPassword = yield new Auth_1.Auth().encryptPassword(password);
                user.password = encryptedPassword;
                yield user.save();
                res.logMsg = `User *${user._id}*  password changed successfully`;
                return ResponseHelper_1.default.ok(res, res.__('user_password_changed'), {});
            }
            catch (err) {
                console.log(err, 'error..');
                next(err);
            }
        });
    }
    /**
  * @api {get} api/v1/app/user/my-profile My Profile
  * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
  * @apiHeader {String} App-Version Version Code 1.0.0.
  * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMu
  * @apiVersion 1.0.0
  * @apiName my-profile
  * @apiGroup App-User
  *
  * @apiSuccessExample {json} Success-Example
  * {
  *          "status": 200,
  *          "statusText": "SUCCESS",
  *          "message": "My Profile",
  *          "data": {
  *              "user": {
  *                  "_id": "62dfcb21fb89c4b45de44685",
  *                  "email": "pukhraj47@mailinator.com",
  *                  "isEmailVerified": true,
  *                  "isAccountActive": true,
  *                  "__v": 0,
  *                  "currentDeviceType": "IOS",
  *                  "accountNumber": 20231949728,
  *                  "avatar": "user-profiles/1659512469817-pukhraj_saini_mce242.png",
  *                  "description": "MEAN STACK DEVELOPER",
  *                  "displayName": "pk",
  *                  "firstName": "puhraj",
  *                  "lastName": "saini",
  *                  "name": "puhraj saini",
  *                  "paypalEmail": "pukhraj.saini97@gmai.com",
  *                  "facebookProfileUrl": "https://facebook.com/pukhrajsaini",
  *                  "instagramUsername": "pukhrajsaini",
  *                  "linkedinProfileUrl": "https://www.linkedin.com/in/pukhrajsaini",
  *                  "twitterUsername": "pukhrajsaini"
  *              },
  *              "execTime": 71
  *          }
  *      }
  *
  *
  * */
    myProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                return ResponseHelper_1.default.ok(res, res.__('my_profile'), { user });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new UserController();
