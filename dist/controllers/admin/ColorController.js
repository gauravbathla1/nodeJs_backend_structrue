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
const ColorModel_1 = require("../../models/ColorModel");
const ApiFeatures_1 = require("../../utils/ApiFeatures");
class ColorController {
    /**
    * @api {post} /api/v1/admin/color Add Color
    * @apiHeader {String} App-Version Version Code 1.0.0.
    * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZDkzODExMDgyMDE1MGUzODI5MjgxOCIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF0IjoxNjU5Njc3OTczLCJleHAiOjE2NTk3NjQzNzN9.4aQEjRkddmVNQZ3glPrbsoCXMtuwJ6I2iWPQZ-QHIbU
    * @apiVersion 1.0.0
    * @apiName add-color
    * @apiGroup Admin-Color
    * @apiParam {String} name
    * @apiParam {String} code
    * @apiParamExample {json} Request-Body:
    * {
    *  "name":"Magenta",
    *  "code":"#FF00FF"
    *}
    *
    * @apiSuccessExample {json} Success-Response:
    *  HTTP/1.1 201 created
    * {
    * "status": 201,
    * "statusText": "CREATED",
    * "message": "New color added",
    *"data": {
    *   "color": {
    *       "name": "Magenta",
    *       "code": "#FF00FF",
    *       "_id": "62ecaf8729081a8c25f07451",
    *       "createdAt": "2022-08-05T05:49:59.258Z",
    *       "updatedAt": "2022-08-05T05:49:59.258Z",
    *       "__v": 0
    * },
    *      * "execTime": 326
    * }
    *}
    *
    */
    addColor(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, code } = req.body;
                const isExist = yield ColorModel_1.default.exists({ name });
                if (isExist) {
                    return ResponseHelper_1.default.badRequest(res, res.__('color_already_exists'));
                }
                const color = yield ColorModel_1.default.create({ name, code });
                return ResponseHelper_1.default.created(res, res.__('new_color_added'), { color });
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
   * @api {get} /api/v1/admin/color?search=Red Get Color
   * @apiHeader {String} App-Version Version Code 1.0.0.
   * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZDkzODExMDgyMDE1MGUzODI5MjgxOCIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF0IjoxNjU5Njg0NTc2LCJleHAiOjE2NTk3NzA5NzZ9.LvpKDBotBbAbdv-hNBtHe6Oa3bqjJct5kH4UA5WBkcg
   * @apiVersion 1.0.0
   * @apiName list-color
   * @apiGroup Admin-Color
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *        {
   *            "status": 200,
   *            "statusText": "SUCCESS",
   *            "message": "Color list fetched successfully",
   *            "data": {
   *                "list": [
   *                    {
   *                        "_id": "62ecae3b29081a8c25f07433",
   *                        "name": "Red",
   *                        "code": "#FF0000",
   *                        "createdAt": "2022-08-05T05:44:27.228Z",
   *                        "updatedAt": "2022-08-05T05:44:27.228Z",
   *                        "__v": 0
   *                    }
   *                ],
   *                "execTime": 80
   *            }
   *        }
   */
    getColor(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryString = req.query;
                const lisQuery = ColorModel_1.default.find();
                const listFeature = new ApiFeatures_1.ApiFeatures(lisQuery, queryString)
                    .searching(['name']);
                const list = yield listFeature.query;
                res.logMsg = `Color list fetched successfully`;
                return ResponseHelper_1.default.ok(res, res.__('color_list'), { list });
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
   * @api {get} /api/v1/admin/_id Delete Color
   * @apiHeader {String} App-Version Version Code 1.0.0.
   * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZDkzODExMDgyMDE1MGUzODI5MjgxOCIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF0IjoxNjU5Njg0NTc2LCJleHAiOjE2NTk3NzA5NzZ9.LvpKDBotBbAbdv-hNBtHe6Oa3bqjJct5kH4UA5WBkcg
   * @apiVersion 1.0.0
   * @apiName delete-color
   * @apiGroup Admin-Color
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *{
   * "status": 200,
   * "statusText": "SUCCESS",
   * "message": "Color deleted successfully",
   *"data": {
   *    "category": {
   *        "_id": "62ecaf8729081a8c25f07451",
   *        "name": "Magenta",
   *        "code": "#FF00FF",
   *        "createdAt": "2022-08-05T05:49:59.258Z",
   *        "updatedAt": "2022-08-05T05:49:59.258Z",
   *        "__v": 0
   *    },
   *    "execTime": 96
   * }
   *    }
   */
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const colorId = req.params.id;
                const color = yield ColorModel_1.default.findByIdAndDelete(colorId);
                if (color) {
                    res.logMsg = 'Color deleted successfully';
                    ResponseHelper_1.default.ok(res, res.__('color_deleted'), { color });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new ColorController();
