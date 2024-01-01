import { NextFunction } from "express";
import ResponseHelper from "../../helpers/ResponseHelper";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
import TechniqueService from "../../services/admin/TechniqueService";

class TechniqueContoller {


  async createTechnique(req: ReqInterface, res: ResInterface, next: NextFunction) {
    try {
      let payload = req.body;
      await TechniqueService.createTechnique(payload);
      return ResponseHelper.created(res, "Technique Added successfully", {});
    } catch (error) {
      next(error);
    }
  }

  async editTechnique(req: ReqInterface, res: ResInterface, next: NextFunction) {
    try {
      let techniqueId = req.params?.id;
      let payload  = req.body;
      await TechniqueService.editTechnique(techniqueId, payload);
      return ResponseHelper.ok(res, "Technique Updated successfully", {});
    } catch (error) {
      next(error);
    }
  }

  async deleteTechnique(
    req: ReqInterface,
    res: ResInterface,
    next: NextFunction
  ) {
    try {
      let techniqueId = req.params?.id;
      const quote = await TechniqueService.deleteTechnique(techniqueId);
      return ResponseHelper.ok(res, "Technique Deleted successfully", { quote });
    } catch (error) {
      next(error);
    }
  }

  async getTechnique(req: ReqInterface, res: ResInterface, next: NextFunction) {
    try {
      let page = req.query.page || 1;
      let options = {
        page: page || 1,
        limit: 10,
        sort: {
          createdAt: 1,
        },
      };
      let quotes = await TechniqueService.getTechniques(options);
      return ResponseHelper.ok(res, "Techniques find successfully", { quotes });
    } catch (error) {
      next;
    }
  }
}
export default new TechniqueContoller();
