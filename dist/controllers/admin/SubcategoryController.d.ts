import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
declare class SubcategoryController {
    /**
     * @api {post} /api/v1/admin/subcategory/ Add Subcategory
     * @apiHeader {String} App-Version Version Code 1.0.0.
     * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF..........
     * @apiVersion 1.0.0
     * @apiName add-subcategory
     * @apiGroup Admin-SubCategory
     * @apiDescription pass required value as params
     * @apiParam {String} name.
     * @apiParam {String} category
     * @apiParam {String} image
     * @apiSuccessExample {json} Success-Response:
     * HTTP/1.1 200 OK
     *{"status":201,"statusText":"CREATED","message":"SubCategory created successfully","data":{"subcategory":{"name":"Subcategory1","category":"62bfe0cf17bbe6f6672739f3","image":"subcat.jpg","isActive":true,"isDeleted":false,"_id":"62c52786e666528d21bf6fd3","createdAt":"2022-07-06T06:11:18.600Z","updatedAt":"2022-07-06T06:11:18.600Z","__v":0},"execTime":106}}
     *
     */
    add(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
     * @api {patch} /api/v1/admin/subcategory/_id   Update Subcategory
     * @apiHeader {String} App-Version Version Code 1.0.0.
     * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF..........
     * @apiVersion 1.0.0
     * @apiName update-category
     * @apiGroup Admin-SubCategory
     * @apiDescription pass required value as params
     * @apiParam {String} name.
     * @apiParam {String} category
     * @apiParam {String} image
     * @apiSuccessExample {json} Success-Response:
     * HTTP/1.1 200 OK
     *{"status":201,"statusText":"UPDATED","message":"SubCategory updated successfully","data":{"subcategory":{"name":"Subcategory1","category":"62bfe0cf17bbe6f6672739f3","image":"subcat.jpg","isActive":true,"isDeleted":false,"_id":"62c52786e666528d21bf6fd3","createdAt":"2022-07-06T06:11:18.600Z","updatedAt":"2022-07-06T06:11:18.600Z","__v":0},"execTime":106}}
     *
     */
    update(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
     * @api {get} /api/v1/admin/subcategory/_id Single Subcategory Details
     * @apiHeader {String} App-Version Version Code 1.0.0.
     * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF..........
     * @apiVersion 1.0.0
     * @apiName get-subcategory
     * @apiGroup Admin-SubCategory
     * @apiPrivate
     *
     * @apiDescription pass category _id as params
     *
     * @apiSuccessExample {json} Success-Response:
     *HTTP/1.1 200 OK
     *{"status":201,"statusText":"SUCCESS","message":"Subcategory List","data":{"subcategory":{"_id":"62c4211e5c4a60984a062837","name":"Gajodhar","category":"62bfe0cf17bbe6f6672739f3","image":"jack.jpg","isActive":true,"isDeleted":false,"createdAt":"2022-07-05T11:31:42.330Z","updatedAt":"2022-07-05T11:31:42.330Z","__v":0},"execTime":59}}
     *
     */
    get(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
     * @api {delete} /api/v1/admin/subcategory/_id Delete Subcategory
     * @apiHeader {String} App-Version Version Code 1.0.0.
     * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF..........
     * @apiVersion 1.0.0
     * @apiName Delete Subcategory
     * @apiGroup Admin-SubCategory
     *
     * @apiDescription pass subcategory _id as params
     *
     * @apiSuccessExample {json} Success-Response:
     * HTTP/1.1 200 OK
     *{"status":201,"statusText":"SUCCESS","message":"Subcategory Deleted","data":{"subcategory":{"_id":"62c4211e5c4a60984a062837","name":"Gajodhar","category":"62bfe0cf17bbe6f6672739f3","image":"jack.jpg","isActive":true,"isDeleted":true,"createdAt":"2022-07-05T11:31:42.330Z","updatedAt":"2022-07-05T11:31:42.330Z","__v":0},"execTime":59}}
     *
     */
    delete(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
     * @api {put} /api/v1/admin/subcategory Upload Category Image
     * @apiHeader {String} App-Version Version Code 1.0.0.
     * @apiVersion 1.0.0
     * @apiName upload-image
     * @apiGroup Admin-SubCategory
     *
     * @apiParam {File} image.
     *
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *    {"status":201,"statusText":"CREATED","message":"Image uploaded successfully","data":{"url":"subcategory/1657018612759-test9.png"}}
     *
     */
    uploadImage(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
      * @api {get} /api/v1/admin/subcategory/_id Get SubCategory List
      * @apiHeader {String} App-Version Version Code 1.0.0.
      * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF..........
      * @apiVersion 1.0.0
      * @apiName list-section
      * @apiGroup Admin-SubCategory
      *
      * @apiDescription pass category _id as params
      * @apiSuccessExample {json} Success-Response:
      *  HTTP/1.1 200 OK
      * {
      *    "status": 200,
      *    "statusText": "SUCCESS",
      *    "message": "Subcategory List successfully",
      *    "data": {
      *        "count": 1,
      *        "list": [
      *            {
      *                "_id": "62c6a92d437247fa040492ce",
      *                "name": "men's Clothings",
      *                "category": "62c6a900437247fa040492c9",
      *                "image": "category/1657103792052-test3.jpeg",
      *                "isActive": true,
      *                "isDeleted": false,
      *                "createdAt": "2022-07-07T09:36:45.907Z",
      *                "updatedAt": "2022-07-07T09:36:45.907Z"
      *            }
      *        ],
      *    }
      * }
      *
      */
    list(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
     * @api {patch} /api/v1/admin/subcategory/_id/status Update Status SubCategory
     * @apiHeader {String} App-Version Version Code 1.0.0.
     * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF0IjoxNjU4NDAxNzE4LCJleHAiOjE2NTg0ODgxMTh9.XD0OhucPIiCOyEEmAu7xUAaI1VdtiE6WgU8NOk_FpWU
     * @apiVersion 1.0.0
     * @apiName update-status-subcategory
     * @apiGroup Admin-SubCategory
     * @apiDescription pass subcategory _id as params
     * @apiSuccessExample {json} Success-Response:
     * HTTP/1.1 200 OK
     * {
     * "status": 200,
     * "statusText": "SUCCESS",
     * "message": "Subcategory update status successfully",
     * "data": {
     *    "_id": "62c6a92d437247fa040492ce",
     *    "name": "men's Clothings",
     *    "category": "62c6a92d437247fa040492ce",
     *    "image": "category/1657103792052-test3.jpeg",
     *    "isActive": false,
     *    "isDeleted": false,
     *    "createdAt": "2022-07-07T09:36:45.907Z",
     *    "updatedAt": "2022-07-07T09:36:45.907Z",
     *    "__v": 0
     *   }
     * }
     *
     */
    activeupdateStatus(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: SubcategoryController;
export default _default;
