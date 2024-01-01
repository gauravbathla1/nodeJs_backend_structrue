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
const BannerModel_1 = require("../../models/BannerModel");
const BannerService_1 = require("../../services/admin/BannerService");
class BannerController {
    /**
        * @api {post} /api/v1/admin/banner Add Banner
        * @apiHeader {String} App-Version Version Code 1.0.0.
        * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF0IjoxNjU4Mjk0OTQ5LCJleHAiOjE2NTgzODEzNDl9.PjHH-y-fKkDRD5Zw5fA8I029Iwc1ESWxnCYszaRTEpo
        * @apiVersion 1.0.0
        * @apiName add-banner
        * @apiGroup Admin-Banner
        * @apiParam {File} photo
        * @apiParam {String} clickUrl
        * @apiParam {String} deviceType
        * @apiParamExample {json} Request-Body:
        * {
        *   "photo": FileType,
        *   "clickUrl":"bgththjyjytjhtht",
        *   "deviceType":"WEB"
        * }
        *
        * @apiSuccessExample {json} Success-Response:
        *HTTP/1.1 201 created
        * {
        * "status": 201,
        * "statusText": "CREATED",
        *  "message": "banner_uploaded",
        * "data": {
        * "clickUrl": "dfjdjgerjrgrpggrrep",
        *"photo": "banner/1658300139383-aggregation.png",
        * "deviceType": "WEB",
        *"isActive": true,
        * "isDeleted": false,
        * "_id": "62d7a6ed678ab2b95ae8d121",
        *"createdAt": "2022-07-20T06:55:41.336Z",
        * "updatedAt": "2022-07-20T06:55:41.336Z",
        *"__v": 0
        * }
        *  }
        *
        */
    addBanner(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const photo = req.files.photo;
                const clickUrl = req.body.clickUrl;
                const deviceType = req.body.deviceType;
                if (!photo)
                    return ResponseHelper_1.default.badRequest(res, res.__('photo_is_required'));
                const data = yield BannerService_1.default.add(photo, clickUrl, deviceType);
                if (data === null || data === void 0 ? void 0 : data.clickUrl) {
                    res.logMsg = 'Banner image uploaded successfully';
                    return ResponseHelper_1.default.created(res, res.__('banner_uploaded'), data);
                }
                else {
                    return ResponseHelper_1.default.serverError(res, res.__('s3_error'));
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
            * @api {patch} /api/v1/admin/banner/_id/edit Edit Banner
            * @apiHeader {String} App-Version Version Code 1.0.0.
            * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF0IjoxNjU4Mjk0OTQ5LCJleHAiOjE2NTgzODEzNDl9.PjHH-y-fKkDRD5Zw5fA8I029Iwc1ESWxnCYszaRTEpo
            * @apiVersion 1.0.0
            * @apiName edit-banner
            * @apiGroup Admin-Banner
            * @apiParam {File} photo
            * @apiParam {String} clickUrl
            * @apiParam {String} deviceType
            * @apiParamExample {json} Request-Body:
            * {
            *   "photo": FileType,
            *   "clickUrl":"fkgkfkjgjbhgjgojrohjtpohjtohpjh",
            *   "deviceType":"MOBILE"
            * }
            *
            * @apiSuccessExample {json} Success-Response:
            *HTTP/1.1 200 success
            *  {
            * "status": 200,
            *   "statusText": "SUCCESS",
            *   "message": "Banner edited successfully",
            *   "data": {
            *     "banner": {
            *    "_id": "62d8f7558ecb874779972d57",
            *    "clickUrl": "fkgkfkjgjbhgjgojrohjtpohjtohpjh",
            *    "photo": "banner/1658744160299-aggregation.png",
            *    "deviceType": "MOBILE",
            *    "isActive": true,
            *    "isDeleted": false,
            *    "createdAt": "2022-07-21T06:51:01.706Z",
            *    "updatedAt": "2022-07-21T06:51:01.706Z",
            *    "__v": 0
            *},
            *"execTime": 2053
            *    }
            *      }
            *
            */
    edit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bannerId = req.params.id;
                const photo = req.files.photo;
                const clickUrl = req.body.clickUrl;
                const deviceType = req.body.deviceType;
                const banner = yield BannerService_1.default.edit(bannerId, photo, clickUrl, deviceType);
                if (banner) {
                    res.logMsg = `Banner edited successfully `;
                    return ResponseHelper_1.default.ok(res, res.__('banner_edited'), { banner });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
        * @api {get} /api/v1/admin/banner Get Banner list
        * @apiHeader {String} App-Version Version Code 1.0.0.
        * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF0IjoxNjU3Njk1MzQzLCJleHAiOjE2NTc3ODE3NDN9.HAJ40QWHuL2QeXo3GVQZKziiiQHbLsq0hyuMM-SgfaY
        * @apiVersion 1.0.0
        * @apiName Get-banner-list
        * @apiGroup Admin-Banner
        * @apiSuccessExample {json} Success-Response:
        *HTTP/1.1 200 OK
        *   {
        *     "status": 200,
        *  "statusText": "SUCCESS",
        *   "message": "Banner list fetch successfully",
        *     "data": {
        *       "list": [
        *      {
        *         "_id": "62d7a6c9827f44cf6eac3b8e",
        *         "clickUrl": "dfjdjgerjrgrpggrrep",
        *         "photo": "banner/1658300102695-aggregation.png",
        *         "deviceType": "WEB",
        *         "isActive": true,
        *         "isDeleted": false,
        *         "createdAt": "2022-07-20T06:55:05.539Z",
        *         "updatedAt": "2022-07-20T06:55:05.539Z"
        *     },
        *      {
        *          "_id": "62d7a3c6c20f9c2535949a82",
        *         "clickUrl": "bgththjyjytjhtht",
        *         "photo": "banner/1658299332562-Rahul Kannoujia(MCE336).jpeg",
        *        "deviceType": "MOBILE",
        *         "isActive": true,
        *        "isDeleted": false,
        *        "createdAt": "2022-07-20T06:42:14.078Z",
        *         "updatedAt": "2022-07-20T06:42:14.078Z"
        *     }
        * ],
        *  }
        *   }
        *
        */
    list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryString = req.query;
                const data = yield BannerService_1.default.list(queryString);
                if (data) {
                    res.logMsg = 'Banner list fetch successfully';
                    return ResponseHelper_1.default.ok(res, res.__('banner_list'), data);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
    * @api {patch} /api/v1/admin/banner/_id/status Update Status Banner
    * @apiHeader {String} App-Version Version Code 1.0.0.
    * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF0IjoxNjU4MzAyNzUzLCJleHAiOjE2NTgzODkxNTN9.sZHSncgjZAdM_gYbP7tIK8NTFTrAo2j10UkG4bHWhxs
    * @apiVersion 1.0.0
    * @apiName update-status-banner
    * @apiGroup Admin-Banner
    * @apiDescription pass banner _id as params
    * @apiSuccessExample {json} Success-Response:
    *HTTP/1.1 200 OK
    * {
    *  "status": 200,
    *  "statusText": "SUCCESS",
    *  "message": "Banner update status successfully",
    * "data": {
    *     "_id": "62d7a3c6c20f9c2535949a82",
    *     "clickUrl": "bgththjyjytjhtht",
    *    "photo": "banner/1658299332562-Rahul Kannoujia(MCE336).jpeg",
    *     "deviceType": "MOBILE",
    *     "isActive": false,
    *      "isDeleted": false,
    *      "createdAt": "2022-07-20T06:42:14.078Z",
    *     "updatedAt": "2022-07-20T06:42:14.078Z",
    *     "__v": 0
    }
}
    *
    */
    activeUpdateStatus(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let bannerId = req.params.id;
                let bannerdata = yield BannerModel_1.default.findOne({
                    "_id": bannerId
                });
                bannerdata.isActive = !bannerdata.isActive;
                bannerdata.save();
                res.logMsg = 'Banner update status  successfully';
                return ResponseHelper_1.default.ok(res, res.__('banner_changed_status'), bannerdata);
            }
            catch (error) {
                next(error);
            }
        });
    }
    ;
}
exports.default = new BannerController();
