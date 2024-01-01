import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
declare class Wishlist {
    /**
     * @api {post} /api/v1/app/wishlist Add Wishlist
     * @apiHeader {String} App-Version Version Code 1.0.0.
     * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTBlMjAyMzM3Mjg3MjY1MzVkMmRlMSIsImVtYWlsIjoicmFodWxAMTI1Z21haWwuY29tIiwiaWF0IjoxNjU4OTg5MDY0LCJleHAiOjE2NTkwNzU0NjR9.R330qWuTXc_ghTYwDOyquNVORxvyWmws1tDYWRZd3hY
     * @apiVersion 1.0.0
     * @apiName add-wishlist
     * @apiGroup App-Wishlist
     * @apiSuccessExample {json} Success-Response:
     * HTTP/1.1 200 success
     *      {
     *  "status": 201,
     *  "statusText": "CREATED",
     *    "message": "Product added in wishlist",
     *      "data": {
     *      "wishlist": {
     *         "productId": "62d672c8f055ab9d06da7821",
     *        "userId": "62e0e20233728726535d2de1",
     *        "_id": "62e22a6b92e49c1f63903728",
     *       "createdAt": "2022-07-28T06:19:23.068Z",
     *       "updatedAt": "2022-07-28T06:19:23.069Z",
     *       "__v": 0
     *  },
     *  "execTime": 80
     *  }
     *
     *
     */
    add(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
   * @api {delete} /api/v1/app/wishlist/_id Delete product from wishlist Wishlist
   * @apiHeader {String} App-Version Version Code 1.0.0.
   * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTBlMjAyMzM3Mjg3MjY1MzVkMmRlMSIsImVtYWlsIjoicmFodWxAMTI1Z21haWwuY29tIiwiaWF0IjoxNjU4OTg5MDY0LCJleHAiOjE2NTkwNzU0NjR9.R330qWuTXc_ghTYwDOyquNVORxvyWmws1tDYWRZd3hY
   * @apiVersion 1.0.0
   * @apiName delete-wishlist
   * @apiGroup App-Wishlist
   * @apiDescription pass productId (product _id    ) as params
   * @apiSuccessExample {json} Success-Response:
   * HTTP/1.1 200 OK
   *  {
   * "status": 200,
   * "statusText": "SUCCESS",
   * "message": "Product deleted from wishlist successfully",
   *   }
   *
   */
    delete(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
   * @api {get} /api/v1/app/wishlist My Wishlist
   * @apiHeader {String} App-Version Version Code 1.0.0.
   * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTBlMjAyMzM3Mjg3MjY1MzVkMmRlMSIsImVtYWlsIjoicmFodWxAMTI1Z21haWwuY29tIiwiaWF0IjoxNjU4OTg5MDY0LCJleHAiOjE2NTkwNzU0NjR9.R330qWuTXc_ghTYwDOyquNVORxvyWmws1tDYWRZd3hY
   * @apiVersion 1.0.0
   * @apiName my-wishlist
   * @apiGroup App-Wishlist
   * @apiSuccessExample {json} Success-Response:
   * HTTP/1.1 200 OK
   *   {
   * "status": 200,
   * "statusText": "SUCCESS",
   * "message": "Wishlist fetch successfully",
   * "data": {
   *   "wishlist": [
   *         {
   *              "_id": "62e0eaf7ea9f933858a295b1",
   *             "userId": "62e0e20233728726535d2de1",
   *              "product": {
   *                  "name": "Mobile",
   *                   "regularPrice": 40000,
   *                   "color": "blue",
   *                   "salePrice": 350,
   *                   "brandName": "nike",
   *                   "coverPhoto": "product/63087b2f224cb585fce762a6/cover-photo/default.png",
   *                 "_id": "62cfb67426bd109f9ae2d7cf"
   *             }
   *         },
   *         {
   *               "_id": "62e0eba4ea9f933858a295b6",
   *             "userId": "62e0e20233728726535d2de1",
   *            "product": {
   *                  "name": "tablefan",
   *                  "regularPrice": 40000,
   *                  "color": "blue",
   *                   "salePrice": 350,
   *                   "brandName": "nike",
   *                   "coverPhoto": "product/63087b2f224cb585fce762a6/cover-photo/default.png",
   *                  "_id": "62cfb9dc26bd109f9ae2d7dd"
   *              }
   *         }
   *     ],
   *    "execTime": 114
   *  }
   *    }
   *
   */
    list(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: Wishlist;
export default _default;
