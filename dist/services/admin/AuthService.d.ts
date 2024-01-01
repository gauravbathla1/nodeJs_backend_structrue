import { NextFunction } from "express";
import { AdminInterface } from "../../interfaces/AdminInterface";
import { ResInterface } from "../../interfaces/ReqInterface";
declare class AuthService {
    createAdmin(): Promise<void>;
    /**
     *
     * @param email {String} user email
     * @param password {Password} user password
     * @param res {ResInterface}
     * @param next {NextFunction} next function
     * @return {Promise<{admin: AdminInterface, token: string}>}
     */
    login(email: string, password: string, res: ResInterface, next: NextFunction): Promise<{
        admin: AdminInterface;
        token: string;
    } | void>;
}
declare const _default: AuthService;
export default _default;
