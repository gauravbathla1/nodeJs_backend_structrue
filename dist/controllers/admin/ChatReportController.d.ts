import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
declare class ChatReportController {
    /**
     * @api {get} /api/v1/admin/chat/report-lis Chat report list
     * @apiHeader {String} App-Version Version Code 1.0.0.
     * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF..........
     * @apiVersion 1.0.0
     * @apiName report-list
     * @apiGroup Admin-Chat
     * @apiSuccessExample {json} Success-Response:
     * {
     *           "status": 200,
     *           "statusText": "SUCCESS",
     *           "message": "Chat reports list",
     *           "data": {
     *               "count": 52,
     *               "list": [
     *                   {
     *                       "_id": "640582a20c124373b3872524",
     *                       "reportedBy": {
     *                           "_id": "6358c5047929638cd2c88446",
     *                           "email": "gauravroy@yopmail.com",
     *                           "avatar": "user-profiles/1676465378852-/7414fdf2-8323-4025-8837-ac602e894b8e.jpg",
     *                           "name": "Gaurav roy"
     *                       },
     *                       "chatText": "HI",
     *                       "reasonText": "Voluptatum natus explicabo consequatur odio facere quisquam.",
     *                       "group": {
     *                           "_id": "63e4df6f0e7484520de4b804",
     *                           "groupCode": "GT9976367",
     *                           "name": "friends"
     *                       },
     *                       "user": {
     *                           "_id": "637b7bbec2b0089dad0f2006",
     *                           "email": "kamalchauhan@yopmail.com",
     *                           "avatar": "user-profiles/1669123247367-black.jpg",
     *                           "name": "Kamal Chauhan"
     *                       }
     *                   }
     *               ],
     *               "execTime": 90
     *           }
     *       }
     *
     * */
    reportsList(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
    * @api {delete} /api/v1/admin/chat/report-delete/:reportId Chat report Delete
    * @apiHeader {String} App-Version Version Code 1.0.0.
    * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF..........
    * @apiVersion 1.0.0
    * @apiName report-delete
    * @apiGroup Admin-Chat
    * @apiSuccessExample {json} Success-Response:
    * {
    *        "status": 200,
    *        "statusText": "SUCCESS",
    *        "message": "Chat report deleted",
    *        "data": {
    *            "execTime": 69
    *        }
    *    }
    *
    * */
    deleteReport(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
   * @api {patch} /api/v1/admin/chat/report-respond/:reportId Respond on report
   * @apiHeader {String} App-Version Version Code 1.0.0.
   * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF..........
   * @apiVersion 1.0.0
   * @apiName report-respond
   * @apiGroup Admin-Chat
   *
   * @apiParam {String} reportedBy report by user _id
   * @apiParam {String} reportedTo reported  user _id
   * @apiParam {String} content email content
   * @apiParam {String} subject email subject
   *
   * @apiSuccessExample {json} Success-Response:
   * {
   *        "status": 200,
   *        "statusText": "SUCCESS",
   *        "message": "Chat report deleted",
   *        "data": {
   *            "execTime": 69
   *        }
   *    }
   *
   * */
    reportRespondTo(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: ChatReportController;
export default _default;
