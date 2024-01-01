import { Router } from "express";
import AuthRoutes from "./admin/AuthRoutes";
class Routes {
  public router: Router;
  constructor() {
    this.router = Router();
    this.app();
    this.admin();
  }

  app() {
  }

  admin() {
    this.router.use('/admin/auth', AuthRoutes);
  }

}
export default new Routes().router;