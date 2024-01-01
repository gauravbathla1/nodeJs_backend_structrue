import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
declare class RecentSearchController {
    /**
          * @api {post} /api/v1/app/recent-search Add Recent Search
          * @apiHeader {String} App-Version Version Code 1.0.0.
          * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
          * @apiVersion 1.0.0
          * @apiPrivate
          * @apiName Add-Recent-Search
          * @apiGroup App-Recent-Search
          *
          * @apiSuccessExample {json} Success-Response-1:
          *  HTTP/1.1 200 OK
          *    {
          *   "status": 201,
          *   "statusText": "CREATED",
          *   "message": "RecentSearch added successfully",
          *     "data": {
          *      "recentsearch": {
          *        "userId": "62e0e20233728726535d2de1",
          *        "searchText": "jacket",
          *        "_id": "62fde16adc221a73564755fe",
          *        "createdAt": "2022-08-18T06:51:22.284Z",
          *        "updatedAt": "2022-08-18T06:51:22.284Z",
          *        "__v": 0
          *           },
          *           "execTime": 72
          *          }
          *      }
          */
    add(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
      * @api {delete} /api/v1/app/recent-search/_id Delete RecentSearch
      * @apiHeader {String} App-Version Version Code 1.0.0.
      * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF..........
      * @apiVersion 1.0.0
      * @apiName Delete Recent-Search
      * @apiGroup App-Recent-Search
      * @apiDescription pass recentsearch _id as param
      * @apiSuccessExample {json} Success-Response:
      * HTTP/1.1 200 OK
      * {
      * "status": 200,
      * "statusText": "SUCCESS",
      * "message": "RecentSearch deleted successfully",
      * "data": {
      *     "recentsearch": {
      *         "_id": "62fde156dc221a73564755f2",
      *         "userId": "62e0e20233728726535d2de1",
      *         "searchText": "shirts",
      *         "createdAt": "2022-08-18T06:51:02.537Z",
      *         "updatedAt": "2022-08-18T06:51:02.537Z",
      *         "__v": 0
      *     },
      *     "execTime": 93
      *    }
      *  }
      *
      */
    delete(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
    * @api {delete} /api/v1/app/recent-search Clear RecentSearch
    * @apiHeader {String} App-Version Version Code 1.0.0.
    * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZWJhZjQyYzYzZGE5OWRhODJjZTcyOCIsImVtYWlsIjoicmFodWxAMTI1Z21haWwuY29tIiwiaWF0IjoxNjU5NjEyOTk0LCJleHAiOjE2NTk2OTkzOTR9.BgVLC42cM61I2A0Y456FprkCbKskGrH1qa3kqljq9g0
    * @apiVersion 1.0.0
    * @apiName Clear-Recent-Search
    * @apiGroup App-Recent-Search
    * @apiSuccessExample {json} Success-Response:
    *  HTTP/1.1 200 OK
    * {
    *  "status": 200,
    *  "statusText": "SUCCESS",
    *  "message": "RecentSearch all clear",
    * "data": {
    *    "recentsearch": {
    *        "acknowledged": true,
    *        "deletedCount": 2
    *    },
    *     "execTime": 78
    * }
    *   }
    *
    */
    clear(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
    * @api {get} /api/v1/app/recent-search Recent Search List
    * @apiHeader {String} App-Version Version Code 1.0.0.
    * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZWJhZjQyYzYzZGE5OWRhODJjZTcyOCIsImVtYWlsIjoicmFodWxAMTI1Z21haWwuY29tIiwiaWF0IjoxNjU5NjEyOTk0LCJleHAiOjE2NTk2OTkzOTR9.BgVLC42cM61I2A0Y456FprkCbKskGrH1qa3kqljq9g0
    * @apiVersion 1.0.0
    * @apiName list
    * @apiGroup App-Recent-Search
    * @apiSuccessExample {json} Success-Response:
    *  HTTP/1.1 200 OK
    * {
    *        "status": 200,
    *        "statusText": "SUCCESS",
    *        "message": "Recent search list",
    *        "data": {
    *            "recentSearch": [
    *                {
    *                    "_id": "63085f785c44819cd0da8518",
    *                    "userId": "62dfcb21fb89c4b45de44685",
    *                    "searchText": "hello",
    *                    "createdAt": "2022-08-26T05:51:52.959Z",
    *                    "updatedAt": "2022-08-26T05:51:52.959Z",
    *                    "__v": 0
    *                }
    *            ],
    *            "execTime": 184
    *        }
    *    }
    *
    * */
    list(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: RecentSearchController;
export default _default;
