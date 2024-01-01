import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
declare class UserController {
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
    getSponserLogo(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    getSpeaker(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    contactForm(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
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
    verifyEmail(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
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
    update(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
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
    changePassword(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
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
    myProfile(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: UserController;
export default _default;
