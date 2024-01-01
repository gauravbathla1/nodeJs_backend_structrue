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
const BrandModel_1 = require("../../models/BrandModel");
const BrandService_1 = require("../../services/admin/BrandService");
class BrandController {
    /**
     * @api {put} /api/v1/admin/brand Add Brand
     * @apiHeader {String} App-Version Version Code 1.0.0.
     * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF0IjoxNjU4Mjk0OTQ5LCJleHAiOjE2NTgzODEzNDl9.PjHH-y-fKkDRD5Zw5fA8I029Iwc1ESWxnCYszaRTEpo
     * @apiVersion 1.0.0
     * @apiName add-brand
     * @apiGroup Admin-Brand
     * @apiParam {File} logoImage
     * @apiParam {String} name
     * @apiParam {Array} categories
     * @apiParamExample {json} Request-Body:
     * {
     *   "logo": FileType,
     *   "name":"Shubham Arya",
     *   "categories":[]
     * }
     *
     ** @apiSuccessExample {json} Success-Response:
     **HTTP/1.1 201 created
     *
     * {
     * "status": 201,
     * "statusText": "CREATED",
     * "message": "Brand added successfully",
     * "data": {
     * "brand": {
     *    "name": "Ashraf sir",
     *    "categories": [
     *        "62d0063bff9b93f5383b0109"
     *    ],
     *    "isActive": true,
     *    "logo": "brands/rest.jpg",
     *    "isDeleted": false,
     *    "_id": "62eb5eb14afaba1f287c38f8",
     *    "createdAt": "2022-08-04T05:52:49.767Z",
     *    "updatedAt": "2022-08-04T05:52:49.767Z",
     *    "timeStamp": 1659592369767,
     *    "__v": 0
     *   },
     *  "execTime": 1922
     *   }
     *   }
     *
     */
    addBrand(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const logoImage = req.files.logoImage;
                let { name, categories } = req.body;
                categories = categories.split(",");
                if (!logoImage)
                    return ResponseHelper_1.default.badRequest(res, res.__("brand_logo_required"));
                if (yield BrandModel_1.default.exists({ name }))
                    return ResponseHelper_1.default.conflict(res, res.__('brand_already_exists'));
                const data = yield BrandService_1.default.addBrand(name, logoImage, categories);
                if (data) {
                    res.logMsg = "Brand added successfully";
                    return ResponseHelper_1.default.created(res, res.__("brand_added"), data);
                }
                else {
                    return ResponseHelper_1.default.serverError(res, res.__("server_error"));
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * @api {get} /api/v1/admin/brand Get Brand list
     * @apiHeader {String} App-Version Version Code 1.0.0.
     * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF0IjoxNjU3Njk1MzQzLCJleHAiOjE2NTc3ODE3NDN9.HAJ40QWHuL2QeXo3GVQZKziiiQHbLsq0hyuMM-SgfaY
     * @apiVersion 1.0.0
     * @apiName Get-brand-list
     * @apiGroup Admin-Brand
     * @apiSuccessExample {json} Success-Response:
     *HTTP/1.1 200 OK
     *  {
     *        "status": 200,
     *        "statusText": "SUCCESS",
     *        "message": "Brand list fetch successfully",
     *        "data": {
     *        "list": [
     *         {
     *            "_id": "62eb972b0060e0fa3cc17be0",
     *            "name": "testChecked23",
     *            "categories": [
     *                "62dfda48fb89c4b45de45303",
     *                "62df82e975c63052a810d5f1"
     *            ],
     *            "isActive": true,
     *            "logo": "brands/toys.jpg",
     *            "isDeleted": false,
     *            "createdAt": "2022-08-04T09:53:47.167Z",
     *            "updatedAt": "2022-08-04T09:53:47.167Z",
     *            "timeStamp": 1659606827167
     *        },
     *        {
     *            "_id": "62eb5eb14afaba1f287c38f8",
     *            "name": "subham arya",
     *            "categories": [
     *                "62d0063bff9b93f5383b0109"
     *            ],
     *            "isActive": false,
     *            "logo": "brands/rest.jpg",
     *            "isDeleted": false,
     *            "createdAt": "2022-08-04T05:52:49.767Z",
     *            "updatedAt": "2022-08-04T05:52:49.767Z",
     *            "timeStamp": 1659592369767
     *        },
     *        {
     *            "_id": "62eb5ca30f9c56b060902273",
     *            "name": "pukraj sir",
     *            "categories": [
     *                "62d0063bff9b93f5383b0109"
     *            ],
     *            "isActive": true,
     *            "logo": "",
     *            "isDeleted": false,
     *            "createdAt": "2022-08-04T05:44:03.926Z",
     *            "updatedAt": "2022-08-04T05:44:03.926Z",
     *            "timeStamp": 1659591843926
     *        },
     *        {
     *            "_id": "62ea652c08f178c2bb110fd9",
     *            "name": "Subham Sir",
     *            "categories": [
     *                "62c565ce198c336e57acf4a7",
     *                "62c6a900437247fa040492c9"
     *            ],
     *            "isActive": true,
     *            "logo": "brands/test3.jpeg",
     *            "isDeleted": false,
     *            "createdAt": "2022-08-03T12:08:12.058Z",
     *            "updatedAt": "2022-08-03T12:08:12.058Z",
     *            "timeStamp": 1659528492058
     *        }
     *    ],
     *    "count": 4,
     *    "execTime": 183
     *      }
     *    }
     *
     */
    list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryString = req.query;
                const data = yield BrandService_1.default.list(queryString);
                res.logMsg = "Brand list fetch Successfully";
                return ResponseHelper_1.default.ok(res, res.__("brand_list"), data);
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * @api {patch} /api/v1/admin/brand/_id Edit Brand
     * @apiHeader {String} App-Version Version Code 1.0.0.
     * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF0IjoxNjU4Mjk0OTQ5LCJleHAiOjE2NTgzODEzNDl9.PjHH-y-fKkDRD5Zw5fA8I029Iwc1ESWxnCYszaRTEpo
     * @apiVersion 1.0.0
     * @apiName edit-brand
     * @apiGroup Admin-Brand
     * @apiParam {File} logoImage
     * @apiParam {String} name
     * @apiParam {Array} categories
     * @apiParamExample {json} Request-Body:
     * {
     *   "logo": FileType,
     *   "name":"subham arya",
     *   "categories":[]
     * }
     *
     * @apiSuccessExample {json} Success-Response:
     *HTTP/1.1 200 success
     *   {
     *      "status": 200,
     *       "statusText": "SUCCESS",
     *      "message": "Brand Updated Successfully",
     *   "data": {
     *   "brand": {
     *   "_id": "62eb5eb14afaba1f287c38f8",
     *   "name": "subham arya",
     *   "categories": [
     *    "62d0063bff9b93f5383b0109"
     *    ],
     *   "isActive": true,
     *   "logo": "brands/rest.jpg",
     *   "isDeleted": false,
     *   "createdAt": "2022-08-04T05:52:49.767Z",
     *   "updatedAt": "2022-08-04T05:52:49.767Z",
     *   "timeStamp": 1659592369767,
     *   "__v": 0
     *   },
     * "execTime": 1704
     *  }
     *   }
     *
     */
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const logoImage = req.files.logoImage;
                const id = req.params.id;
                let { name, categories } = req.body;
                categories = categories.split(",");
                const brand = yield BrandService_1.default.edit(id, logoImage, name, categories);
                if (brand) {
                    res.logMsg = "Brand updated successfully";
                    ResponseHelper_1.default.ok(res, res.__("brand_updated"), { brand });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
      * @api {patch} /api/v1/admin/brand/_id/status Update Status Brand
      * @apiHeader {String} App-Version Version Code 1.0.0.
      * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF0IjoxNjU4MzAyNzUzLCJleHAiOjE2NTgzODkxNTN9.sZHSncgjZAdM_gYbP7tIK8NTFTrAo2j10UkG4bHWhxs
      * @apiVersion 1.0.0
      * @apiName update-status-brand
      * @apiGroup Admin-Brand
      * @apiDescription pass brand _id as params
      * @apiSuccessExample {json} Success-Response:
      *HTTP/1.1 200 OK
      *  {
      *   "status": 200,
      *   "statusText": "SUCCESS",
      *   "message": "Brand update status sucessfully",
      *   "data": {
      *    "_id": "62d7a3c6c20f9c2535949a82",
      *    "name": "bgththjyjytjhtht",
      *    "logo": "brand/toy.jpeg",
      *    "deviceType": "MOBILE",
      *    "isActive": false,
      *    "isDeleted": false,
      *    "createdAt": "2022-07-20T06:42:14.078Z",
      *    "updatedAt": "2022-07-20T06:42:14.078Z",
      *    "__v": 0
      *        }
      *      }
      *
      */
    ChangeBrandStatus(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let brandId = req.params.id;
                let brandData = yield BrandModel_1.default.findById(brandId);
                brandData.isActive = !brandData.isActive;
                yield brandData.save();
                res.logMsg = "Brand Status Changed";
                return ResponseHelper_1.default.ok(res, res.__("brand_changed_status"), {});
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new BrandController();
