import { NextFunction } from "express";
import ResponseHelper from "../../helpers/ResponseHelper";
import { AdminInterface } from "../../interfaces/AdminInterface";
import { ResInterface } from "../../interfaces/ReqInterface";
import AdminModel from "../../models/AdminModel";
import { Auth } from "../../utils/Auth";

class AuthService {
    async createAdmin() {
        try {
            const encryptedPassword = await new Auth().encryptPassword('Admin@1234');

            const isAdminExist = await AdminModel.exists({ email: 'admin@hsp.com' });
            if (isAdminExist) {
                console.log('Admin Exists');
            }
            else {
                await AdminModel.create({
                    email: 'admin@hsp.com',
                    password: encryptedPassword,
                    name: 'Tas Admin'
                });

                console.log('Admin created');
            }

        } catch (error) {
            console.log('error', error);
        }
    }


    /**
     * 
     * @param email {String} user email
     * @param password {Password} user password
     * @param res {ResInterface} 
     * @param next {NextFunction} next function
     * @return {Promise<{admin: AdminInterface, token: string}>}
     */
    async login(
        email: string,
        password: string,
        res: ResInterface,
        next: NextFunction
    ): Promise<{ admin: AdminInterface, token: string } | void> {
        try {
            const admin = await AdminModel.findOne({ email });

            if (!admin) {
                return ResponseHelper.badRequest(res, res.__('invalid_email_password'));
            }

            const isPasswordCorrect = await new Auth().comparePassword(password, admin.password);

            if (!isPasswordCorrect) {
                return ResponseHelper.badRequest(res, res.__('invalid_email_password'));
            }
            

            const payload = {
                id: admin._id,
                email: admin.email,
            }

            const token = await Auth.getToken(
                payload,
                '1d',
                next
            );

            admin.password = undefined;

            return {
                admin,
                token
            }

        } catch (error) {
            next(error);
        }
    }

    
}

export default new AuthService();