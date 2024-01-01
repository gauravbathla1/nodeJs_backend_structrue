import { NextFunction } from "express";
import ResponseHelper from "../../helpers/ResponseHelper";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
import SituationService from "../../services/admin/SituationService";

class SituationContoller {


  async createSituation(req: ReqInterface, res: ResInterface, next: NextFunction) {
    try {
      let payload = req.body;
      await SituationService.createSituation(payload);
      return ResponseHelper.created(res, "Situation Added successfully", {});
    } catch (error) {
      next(error);
    }
  }

  async editSituation(req: ReqInterface, res: ResInterface, next: NextFunction) {
    try {
      let situtionId = req.params?.id;
      let payload  = req.body;
      await SituationService.editSituation(situtionId, payload);
      return ResponseHelper.ok(res, "Situation Updated successfully", {});
    } catch (error) {
      next(error);
    }
  }

  async deleteSituation(
    req: ReqInterface,
    res: ResInterface,
    next: NextFunction
  ) {
    try {
      let situtionId = req.params?.id;
      const quote = await SituationService.deleteSituation(situtionId);
      return ResponseHelper.ok(res, "Situation Deleted successfully", { quote });
    } catch (error) {
      next(error);
    }
  }

  async getSituation(req: ReqInterface, res: ResInterface, next: NextFunction) {
    try {
      let page = req.query.page || 1;
      let options = {
        page: page || 1,
        limit: 10,
        sort: {
          createdAt: 1,
        },
      };
      let situations = await SituationService.getSituations(options);
      return ResponseHelper.ok(res, "Situation find successfully", { situations });
    } catch (error) {
      next;
    }
  };

  async uploadImage(req: ReqInterface, res: ResInterface, next: NextFunction){
    try {
      let files = req?.files;
      let path = await SituationService.uploadImage(files);
      return res.status(200).json({image:path});
    } catch (error) {
      next(error);
    }
  }
}
export default new SituationContoller();
