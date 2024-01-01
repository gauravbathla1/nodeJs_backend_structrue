// import { NextFunction } from "express";
// import { S3_DIRECTORY } from "../../constants/S3Constant";
// import { UserInterface } from "../../interfaces/UserInterface";
// import UserModel from "../../models/UserModel";
// import { Auth } from "../../utils/Auth";
// import { Email } from "../../utils/Email";
// import { FileUpload } from "../../utils/FileUpload";
// import AuthService from "./AuthService";
// import { ObjectId } from 'mongoose';
// import ResponseHelper from "../../helpers/ResponseHelper";
// import { ResInterface } from "../../interfaces/ReqInterface";
// class UserService {
//     /**
//          * @param  {File} profilePic
//          * @param {UserInterface} 
//          * @return {Promise<UserInterface>} edit profile user
//          */

//     async editProfile(
//         profilePic: any,
//         user: UserInterface,
//         userData: any,
//         next: NextFunction
//     ): Promise<{ user: UserInterface, isEmailChanged: boolean } | void> {

//         let url = user.profilePic;
//         if (profilePic) {
//             url = await this.uploadPhoto(profilePic, S3_DIRECTORY.userPics)
//         }

//         userData.avatar = url;
//         userData.isCompleted = true;
//         if (userData.isEmailChanged) {
//             return {
//                 user: await this.changeEmailAndUpdateProfile(userData, user, next),
//                 isEmailChanged: true
//             };
//         }
//         else {
//             user = await UserModel.findByIdAndUpdate(
//                 user._id,
//                 userData,
//                 {
//                     new: true
//                 }
//             );
//             return {
//                 user,
//                 isEmailChanged: false
//             };
//         }


//     }




//     /**
//      * 
//      * @param profilePic 
//      * @param directory 
//      * @returns uploaded file absolute path
//      */
//     private async uploadPhoto(
//         profilePic: any,
//         directory: string,
//     ): Promise<string> {
//         const fileName = `${Date.now()}-${profilePic.originalFilename}`;
//         return await new FileUpload().uploadFileOnS3(profilePic, directory, fileName);
//     }


//     /**
//      * 
//      * @param userData 
//      * @param user 
//      * @returns user
//      */
//     async changeEmailAndUpdateProfile(
//         userData: UserInterface,
//         user: UserInterface,
//         next: NextFunction
//     ): Promise<UserInterface> {
//         userData.changedEmail = userData.email;
//         delete userData.email;

//         user = await UserModel.findByIdAndUpdate(
//             user._id,
//             userData,
//             {
//                 new: true
//             }
//         );

//         const emailVerificationToken = await new Auth().getToken(
//             {
//                 id: user._id,
//                 role: 'VERIFY_EMAIL'
//             },
//             '1d',
//             next
//         );

//         const endPoint = '/root/verify-email?token=';
//         const emailVerificationLink: string = await AuthService.getDeepLink(endPoint, emailVerificationToken);
//         console.log('Email verification link', emailVerificationLink);
//         await new Email(user.changedEmail).sendVerificationEmail(emailVerificationLink);
//         return user;
//     }


//     async verifyEmail(
//         user: UserInterface,
//         email: string,
//         token: string,
//         res: ResInterface,
//         next: NextFunction
//     ): Promise<{ user: UserInterface } | void> {
//         const decoded = await new Auth().decodeJwt(token);
//         if (decoded.role !== 'VERIFY_EMAIL') {
//             return ResponseHelper.badRequest(res, res.__('invalid_verification_token'));
//         }

//         const tokenCreatedTimeDiff = Math.floor(new Date().getTime() / 1000) - decoded.iat;
//         if (tokenCreatedTimeDiff > 10 * 60) {
//             return ResponseHelper.expired(res, res.__('verification_token_expired'))
//         }
//         user.email = email;
//         user.isEmailVerified = true;
//         user.isAccountActive = true;
//         user.changedEmail = undefined;
//         await user.save();
//         user.password = undefined;
//         return {
//             user
//         }
//     }


//     /**
//      * 
//      * @param id 
//      * @param facebookProfileUrl 
//      * @param linkedinProfileUrl 
//      * @param twitterUsername 
//      * @param instagramUsername 
//      * @returns updated user
//      */

//     async update(
//         id: string | ObjectId,
//         facebookProfileUrl: string,
//         linkedinProfileUrl: string,
//         twitterUsername: string,
//         instagramUsername: string,
//     ): Promise<UserInterface> {
//         const updateUser: UserInterface = await UserModel.findByIdAndUpdate(
//             id,
//             {
//                 facebookProfileUrl,
//                 linkedinProfileUrl,
//                 twitterUsername,
//                 instagramUsername,
//                 isCompleted: true
//             },
//             {
//                 new: true
//             }
//         );
//         return updateUser;
//     }

//     async generateCustomerCode(): Promise<string> {
//         let code = new Auth().generateVerificationCode(6);
//         code = `WFU${code}`;
//         const exist = await UserModel.exists({ customerCode: code });
//         if (exist) {
//             code = await this.generateCustomerCode();
//         }

//         return code;
//     }
// }

// export default new UserService();