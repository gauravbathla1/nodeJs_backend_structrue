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
const Auth_1 = require("../../utils/Auth");
class AuthService {
    createAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const encryptedPassword = yield new Auth_1.Auth().encryptPassword('Admin@1234');
                const isAdminExist = yield AdminModel_1.default.exists({ email: 'admin@hsp.com' });
                if (isAdminExist) {
                    console.log('Admin Exists');
                }
                else {
                    yield AdminModel_1.default.create({
                        email: 'admin@hsp.com',
                        password: encryptedPassword,
                        name: 'Tas Admin'
                    });
                    console.log('Admin created');
                }
            }
            catch (error) {
                console.log('error', error);
            }
        });
    }
    /**
     *
     * @param email {String} user email
     * @param password {Password} user password
     * @param res {ResInterface}
     * @param next {NextFunction} next function
     * @return {Promise<{admin: AdminInterface, token: string}>}
     */
    login(email, password, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admin = yield AdminModel_1.default.findOne({ email });
                if (!admin) {
                    return ResponseHelper_1.default.badRequest(res, res.__('invalid_email_password'));
                }
                const isPasswordCorrect = yield new Auth_1.Auth().comparePassword(password, admin.password);
                if (!isPasswordCorrect) {
                    return ResponseHelper_1.default.badRequest(res, res.__('invalid_email_password'));
                }
                const payload = {
                    id: admin._id,
                    email: admin.email,
                };
                const token = yield Auth_1.Auth.getToken(payload, '1d', next);
                admin.password = undefined;
                return {
                    admin,
                    token
                };
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new AuthService();
