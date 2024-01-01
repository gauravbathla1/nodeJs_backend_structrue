import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
declare class ReportReasonController {
    /**
    * @api {post} /api/v1/admin/report-reason Add ReportReason
    * @apiHeader {String} App-Version Version Code 1.0.0.
    * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZDkzODExMDgyMDE1MGUzODI5MjgxOCIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF0IjoxNjU5NTI3MDgwLCJleHAiOjE2NTk2MTM0ODB9.7V57OGXkv3ZmB39agsQ1ZV7R9Kc50z8v8Tjf551NW78
    * @apiVersion 1.0.0
    * @apiName add-reportreason
    * @apiGroup Admin-ReportReason
    * @apiParam {String} title
    * @apiParam {String} text
    * @apiParamExample {json} Request-Body:
    *{
    * "categoryId":"62c565ce198c336e57acf4a7",
    * "title":" t-shirt issue",
    * "text":"t-shirt size does not match pls actual size provided and pls exchange my t-shirt"
    * }

    *
    * @apiSuccessExample {json} Success-Response:
    * {
    *  "status": 201,
    *  "statusText": "CREATED",
    *  "message": "ReportReason added successfully",
    *  "data": {
    *    "reportreason": {
    *        "categoryId": "62c565ce198c336e57acf4a7",
    *        "title": " t-shirt issue",
    *        "text": "t-shirt size does not match pls actual size provided and pls exchange my t-shirt",
    *        "isActive": true,
    *        "_id": "62fb85d1eef894946d6c09e8",
    *        "createdAt": "2022-08-16T11:56:01.916Z",
    *        "updatedAt": "2022-08-16T11:56:01.916Z",
    *        "__v": 0
    *    },
    *    "execTime": 90
    *   }
    *   }
    */
    add(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
   * @api {patch} /api/v1/admin/report-reason/_id Update reportreason
   * @apiHeader {String} App-Version Version Code 1.0.0.
   * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF..........
   * @apiVersion 1.0.0
   * @apiName update-reportreason
   * @apiGroup Admin-ReportReason
   * @apiDescription pass section _id as params
   * @apiParam {String} title
   * @apiParam {String} text
   * @apiParamExample {json} Request-Body:
   *{
   *   "title":"dresses",
   *   "text":"my dress are defected pls exchange my dress"
   * }
 
   *
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *
   * "status": 200,
   * "statusText": "SUCCESS",
   * "message": "ReportReason updated successfully",
   * "data": {
   *     "reportreason": {
   *         "_id": "62fb7d7069f7efa9afa1a3e7",
   *         "categoryId": "62c565ce198c336e57acf4a7",
   *         "title": "sports",
   *         "text": "my bats are scratched pls exchange my bats",
   *         "isActive": true,
   *         "createdAt": "2022-08-16T11:20:16.589Z",
   *         "updatedAt": "2022-08-16T11:26:12.182Z",
   *         "__v": 0
   *     },
   *     "execTime": 56
   *    }
   *    }
   * */
    update(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
    * @api {get} /api/v1/admin/report-reason/ Get ReportReason
    * @apiHeader {String} App-Version Version Code 1.0.0.
    * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF..........
    * @apiVersion 1.0.0
    * @apiName list-reportreason
    * @apiGroup Admin-ReportReason
    * @apiSuccessExample {json} Success-Response:
    *  HTTP/1.1 200 OK
    *  {
    *        "status": 200,
    *        "statusText": "SUCCESS",
    *        "message": "ReportReason list fetch successfully",
    *        "data": {
    *            "list": [
    *            "_id": "62fb85d1eef894946d6c09e8",
    *              "categoryId": "62c565ce198c336e57acf4a7",
    *              "title": " t-shirt issue",
    *              "text": "t-shirt size does not match pls actual size provided and pls exchange my t-shirt",
    *              "isActive": true,
    *              "createdAt": "2022-08-16T11:56:01.916Z",
    *              "updatedAt": "2022-08-16T11:56:01.916Z",
    *            "__v": 0
    *        },
    *            ],
    *            "count": 4,
    *            "execTime": 81
    *        }
    *    }
    */
    list(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
    * @api {patch} /api/v1/admin/report-reason/_id/status Update Status ReportReason
    * @apiHeader {String} App-Version Version Code 1.0.0.
    * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZDkzODExMDgyMDE1MGUzODI5MjgxOCIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF0IjoxNjU5NTI3MDgwLCJleHAiOjE2NTk2MTM0ODB9.7V57OGXkv3ZmB39agsQ1ZV7R9Kc50z8v8Tjf551NW78
    * @apiVersion 1.0.0
    * @apiName update-status-reportreason
    * @apiGroup Admin-ReportReason
    * @apiDescription pass section _id as params
    * @apiSuccessExample {json} Success-Response:
    * HTTP/1.1 200 OK
    *        {
    *            "status": 200,
    *            "statusText": "SUCCESS",
    *            "message": "ReportReason  status changed successfully",
    *            "data": {
    *                "_id": "62ea61e7258089711f8cafa4",
    *                "categoryId": "62c565ce198c336e57acf4a7",
    *                "title": "mobile display",
    *                "text": "mobile display is damaged pls exchange my mobile",
    *                "isActive": false,
    *                "createdAt": "2022-08-03T11:54:15.268Z",
    *                "updatedAt": "2022-08-03T11:54:15.268Z",
    *                "__v": 0
    *            }
    *        }
    *
    */
    activeupdateStatus(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: ReportReasonController;
export default _default;
