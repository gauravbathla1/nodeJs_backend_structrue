import { Router } from "express";
import AuthController from "../../controllers/admin/AuthController";
import AuthenticationMiddleware from "../../middlewares/AuthenticationMiddleware";
import AuthValidator from "../../validators/admin/AuthValidator";
import UserController from "../../controllers/admin/UserControoller";


class AuthRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.postRoutes();
        this.getRoutes();
        this.patchRoutes();
    }

    getRoutes(){
        this.router.get('/dashboard',UserController.getDashBoardData)
        this.router.get('/',AuthenticationMiddleware.admin,UserController.getUserList)

    }

    postRoutes() {
        this.router.post(
            '/login',
            AuthValidator.login,
            AuthController.login
        );

        this.router.post(
            '/change-password',
            AuthenticationMiddleware.admin,
            AuthValidator.changePassword,
            AuthController.changePassword
        );
        this.router.post(
            '/forgot-password',
            AuthValidator.forgotPassword,
            AuthController.forgetPassword
        );
        this.router.post(
            '/verify-link',
            AuthenticationMiddleware.admin,
            AuthController.verifyLink
        );
        this.router.post(
            '/reset-password',
            AuthenticationMiddleware.admin,
            AuthController.resetPassword
        );
    }

    patchRoutes() {
        this.router.get('/user/:id',AuthenticationMiddleware.admin,UserController.updateUserStats)
       
    }
}

export default new AuthRoutes().router;