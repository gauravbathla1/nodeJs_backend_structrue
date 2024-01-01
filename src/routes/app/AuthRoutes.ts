import { Router } from "express";
import AuthController from "../../controllers/app/AuthController";
import AuthValidator from "../../validators/admin/AuthValidator";


class AuthRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.postRoutes();
    }

    postRoutes() {
        this.router.post(
            '/login',
            AuthValidator.socialLogin,
            AuthController.socailLogin
        );
        this.router.post(
            '/guest-login',
            AuthValidator.guestLogin,
            AuthController.guestLogin
        );
    }

}

export default new AuthRoutes().router;