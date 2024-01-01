import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
declare class SectionController {
    /**
    * @api {post} /api/v1/admin/section Add Section
    * @apiHeader {String} App-Version Version Code 1.0.0.
    * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF..........
    * @apiVersion 1.0.0
    * @apiName add-section
    * @apiGroup Admin-Section
    *
    * @apiParam {String} name
    * @apiParam {String} category
    * @apiParam {String} subcategory
    *
    * @apiParamExample {json} Request-Body:
    * {
    *        "category": "62c565ce198c336e57acf4a7",
    *        "subcategory": "62c57716f96069e70cf20b57",
    *        "name": "dresses"
    *    }
    *
    * @apiSuccessExample {json} Success-Response:
    *  HTTP/1.1 200 OK
    * {
    *        "status": 201,
    *        "statusText": "CREATED",
    *        "message": "Section created successfully",
    *        "data": {
    *            "section": {
    *                "category": "62c565ce198c336e57acf4a7",
    *                "subcategory": "62c57716f96069e70cf20b57",
    *                "name": "dresses",
    *                "isActive": true,
    *                "isDeleted": false,
    *                "_id": "62c57985e157e053e48266ce",
    *                "createdAt": "2022-07-06T12:01:09.501Z",
    *                "updatedAt": "2022-07-06T12:01:09.501Z",
    *                "__v": 0
    *            }
    *    }
    *
    */
    add(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
  * @api {get} /api/v1/admin/section/_id Get section
   * @apiHeader {String} App-Version Version Code 1.0.0.
   * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF..........
   * @apiVersion 1.0.0
   * @apiName Get-Section
   * @apiGroup Admin-Section
   * @apiDescription pass section _id as params
   * @apiSuccessExample {json} Success-Response:
  *  HTTP/1.1 200 OK
  *{
  * "status": 200,
  *"statusText": "SUCCESS",
  *"message": "Section list get successfully",
  *"data": {
  * *   "section": {
  *        "_id": "62c57985e157e053e48266ce",
  *        "category": "62c565ce198c336e57acf4a7",
  *        "subcategory": "62c57716f96069e70cf20b57",
  *        "name": "dresses",
  *        "isActive": true,
  *        "isDeleted": false,
  *        "createdAt": "2022-07-06T12:01:09.501Z",
   *       "updatedAt": "2022-07-06T12:01:09.501Z",
   *       "__v": 0
    *  },
   *   "execTime": 88
  *}
}
  *
  */
    getSectionById(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
      * @api {delete} /api/v1/admin/section/_id Delete Section
      * @apiHeader {String} App-Version Version Code 1.0.0.
      * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF..........
      * @apiVersion 1.0.0
      * @apiName Delete Section
      * @apiGroup Admin-Section
      *
      * @apiDescription pass section _id as params
      *
      * @apiSuccessExample {json} Success-Response:
      *HTTP/1.1 200 OK
      * {
      * "status": 200,
      * "statusText": "SUCCESS",
      * "message": "Section deleted successfully",
      * "data": {
      *     "section": {
      *        "_id": "62c6a9725336da285a65cc84",
      *        "category": "62c6a900437247fa040492c9",
      *        "subcategory": "62c6a92d437247fa040492ce",
      *        "name": "mandresss",
      *        "isActive": true,
      *       "isDeleted": false,
      *       "createdAt": "2022-07-07T09:37:54.016Z",
      *      "updatedAt": "2022-07-07T09:37:54.016Z",
      *        "__v": 0
      *    },
      *    "execTime": 63
      * }
  }
      *
      */
    delete(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
    * @api {patch} /api/v1/admin/section/_id Update section
    * @apiHeader {String} App-Version Version Code 1.0.0.
    * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF..........
    * @apiVersion 1.0.0
    * @apiName update-section
    * @apiGroup Admin-Section
    *
    * @apiDescription pass section _id as params
    *
    * @apiParam {String} name
    * @apiParam {String} category
    * @apiParam {String} subcategory
    *
    * @apiParamExample {json} Request-Body:
    * {
    *        "category": "62c565ce198c336e57acf4a7",
    *        "subcategory": "62c57716f96069e70cf20b57",
    *        "name": "dresses"
    *    }
    *
    * @apiSuccessExample {json} Success-Response:
    *  HTTP/1.1 200 OK
    * {
    *        "status": 201,
    *        "statusText": "SUCCESS",
    *        "message": "Section updated successfully",
    *        "data": {
    *            "section": {
    *                "category": "62c565ce198c336e57acf4a7",
    *                "subcategory": "62c57716f96069e70cf20b57",
    *                "name": "dresses",
    *                "isActive": true,
    *                "isDeleted": false,
    *                "_id": "62c57985e157e053e48266ce",
    *                "createdAt": "2022-07-06T12:01:09.501Z",
    *                "updatedAt": "2022-07-06T12:01:09.501Z",
    *                "__v": 0
    *            },
    *        }
    *    }
    *
    */
    update(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
    * @api {get} /api/v1/admin/section/_id Get Section List
    * @apiHeader {String} App-Version Version Code 1.0.0.
    * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF..........
    * @apiVersion 1.0.0
    * @apiName list-section
    * @apiGroup Admin-Section
    * @apiDescription pass subcategory _id as params
    * @apiSuccessExample {json} Success-Response:
    *  HTTP/1.1 200 OK
    *    {
    *    "status": 200,
    *    "statusText": "SUCCESS",
    *    "message": "Section list get successfully",
    *    "data": {
    *        "list": [
    *            {
    *                "_id": "62c6a963437247fa040492d4",
    *                "category": "62c6a900437247fa040492c9",
    *                "subcategory": "62c6a92d437247fa040492ce",
    *                "name": "man dresss",
    *                "isActive": true,
    *                "isDeleted": false,
    *                "createdAt": "2022-07-07T09:37:39.752Z",
    *                "updatedAt": "2022-07-07T09:37:39.752Z"
    *            }
    *        ],
    *        "count": 1,
    *        "execTime": 100
    *        }
    *    }
    *
    */
    list(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
    * @api {patch} /api/v1/admin/section/_id/status Update Status Section
    * @apiHeader {String} App-Version Version Code 1.0.0.
    * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF0IjoxNjU4NDAxMDc2LCJleHAiOjE2NTg0ODc0NzZ9.zvsp9yJKoXl9FUfp76BxnG3fDbUCVeRUNqf8jqQbBgw
    * @apiVersion 1.0.0
    * @apiName update-status-section
    * @apiGroup Admin-Section
    * @apiDescription pass section _id as params
    * @apiSuccessExample {json} Success-Response:
    *HTTP/1.1 200 OK
   {
    "status": 200,
    "statusText": "SUCCESS",
    "message": "section_update",
    "data": {
        "_id": "62c57985e157e053e48266ce",
        "category": "62c565ce198c336e57acf4a7",
        "subcategory": "62c57716f96069e70cf20b57",
        "name": "dresses",
        "isActive": false,
        "isDeleted": false,
        "createdAt": "2022-07-06T12:01:09.501Z",
        "updatedAt": "2022-07-06T12:01:09.501Z",
        "__v": 0
    }
}
    *
    */
    activeupdateStatus(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: SectionController;
export default _default;
