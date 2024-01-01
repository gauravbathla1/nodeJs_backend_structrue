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
const AdminModel_1 = require("../../models/AdminModel");
const AuthService_1 = require("../../services/admin/AuthService");
const Auth_1 = require("../../utils/Auth");
const Nodemailer_1 = require("../../helpers/Nodemailer");
class AuthController {
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.body.email;
                const password = req.body.password;
                const data = yield AuthService_1.default.login(email, password, res, next);
                if (data)
                    return ResponseHelper_1.default.ok(res, res.__("login_successfully"), data);
            }
            catch (error) {
                next(error);
            }
        });
    }
    changePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const passwordCurrent = req.body.passwordCurrent;
                const password = req.body.password;
                const admin = yield AdminModel_1.default.findById(req.admin._id);
                const isPasswordCurrentCorrect = yield new Auth_1.Auth().comparePassword(passwordCurrent, admin.password);
                if (!isPasswordCurrentCorrect) {
                    return ResponseHelper_1.default.badRequest(res, res.__("incorrect_password"));
                }
                const encryptedPassword = yield new Auth_1.Auth().encryptPassword(password);
                admin.password = encryptedPassword;
                yield admin.save();
                res.logMsg = "Admin password changed successfully";
                return ResponseHelper_1.default.ok(res, res.__("admin_password_changed"), {});
            }
            catch (err) {
                next(err);
            }
        });
    }
    forgetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            try {
                let user = yield AdminModel_1.default.findOne({ email }).select("+password");
                if (!user) {
                    return ResponseHelper_1.default.badRequest(res, "Please check the provided email", "SUCCESS");
                }
                else {
                    let otp_expiry = Date.now() + 5 * 60000;
                    const val = Math.floor(1000 + Math.random() * 9000);
                    user.otp_expiry = otp_expiry;
                    user.otp = val;
                    user.save();
                    let token = yield Auth_1.Auth.getToken({ id: user._id, email: user.email }, "1d");
                    // let link = "https://admin.yoodle.app/#/new-password/":"https://admin-staging.yoodle.app/#/new-password/" + key, "gaurav", "forgot"
                    let link = `http://localhost:4200/#/new-password?token=${token}`;
                    const dynamicData = {
                        name: 'Admin',
                        link: link,
                        loginLink: 'http://localhost:4200/login',
                        currentYear: new Date().getFullYear(),
                        type: 'forgot-password'
                    };
                    yield Nodemailer_1.default.sendEmail(user.email, "Forgot password", dynamicData);
                    // let link = `http://localhost:4200/#/new-password`
                    // let mail = await EmailService.sendResetPasswordLink(user.email, process.env.NODE_ENV=='dev'?"https://admin.yoodle.app/#/new-password/":"https://admin-staging.yoodle.app/#/new-password/" + key, "gaurav", "forgot")
                    return ResponseHelper_1.default.ok(res, "Email Verification sent.", { link });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    verifyLink(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = (_a = req.admin) === null || _a === void 0 ? void 0 : _a._id;
                // let otp = req.body.otp;
                let admin = yield AdminModel_1.default.findOne({ _id: id });
                if (admin != null) {
                    if (admin.otp_expiry < Date.now()) {
                        return ResponseHelper_1.default.badRequest(res, "Link is expired", {});
                    }
                    return ResponseHelper_1.default.ok(res, "Otp Verified", {});
                }
                return ResponseHelper_1.default.badRequest(res, "Link is expired", {});
            }
            catch (e) {
                next(e);
            }
        });
    }
    resetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userId = req.admin._id;
                let user = yield AdminModel_1.default.findOne({
                    _id: userId,
                });
                console.log(user, "usususu");
                if (user != null) {
                    user.password = yield new Auth_1.Auth().encryptPassword(req.body.newPassword);
                    user.otp = null;
                    user.otp_expiry = null;
                    yield user.save();
                    // return ResponseHelper.ok(res, "Password changed successfully.", "SUCCESS");
                    return ResponseHelper_1.default.ok(res, res.__("Password changed successfully"), {});
                }
            }
            catch (e) {
                console.log(e);
                next(e);
            }
        });
    }
    ;
}
exports.default = new AuthController();
