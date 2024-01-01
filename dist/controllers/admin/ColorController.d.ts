import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
declare class ColorController {
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
    addColor(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
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
    getColor(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
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
    delete(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: ColorController;
export default _default;
