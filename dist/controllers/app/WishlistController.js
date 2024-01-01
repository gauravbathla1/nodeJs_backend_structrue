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
const WishlistModel_1 = require("../../models/WishlistModel");
const WishlistService_1 = require("../../services/app/WishlistService");
class Wishlist {
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
    add(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user._id;
                const productId = req.body.productId;
                const isExists = yield WishlistModel_1.default.exists({ userId: req.user._id, productId });
                if (isExists) {
                    ResponseHelper_1.default.badRequest(res, res.__('product_wishlist_exists'));
                }
                const wishlist = yield WishlistService_1.default.add(productId, userId);
                if (wishlist) {
                    res.logMsg = "Product added in wishlist";
                    return ResponseHelper_1.default.created(res, res.__("wishlist_created"), {
                        wishlist,
                    });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
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
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = req.params.id;
                const userId = `${req.user._id}`;
                yield WishlistModel_1.default.deleteOne({ productId, userId });
                res.logMsg = 'Wishlist deleted successfully';
                ResponseHelper_1.default.ok(res, res.__('wishlist_deleted'), {});
            }
            catch (error) {
                next(error);
            }
        });
    }
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
    list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user._id;
                yield WishlistService_1.default.list(userId);
                const wishlist = yield WishlistModel_1.default.aggregate([
                    {
                        '$lookup': {
                            'from': 'products',
                            'localField': 'productId',
                            'foreignField': '_id',
                            'as': 'product'
                        }
                    }, {
                        '$unwind': {
                            'path': '$product',
                            'preserveNullAndEmptyArrays': false
                        }
                    }, {
                        '$project': {
                            'userId': 1,
                            'product': {
                                '_id': '$product._id',
                                'name': 1,
                                'regularPrice': 1,
                                'color': 1,
                                'brandName': 1,
                                'coverPhoto': 1,
                                'salePrice': 1
                            }
                        }
                    }
                ]);
                return ResponseHelper_1.default.ok(res, res.__('wish_list'), { wishlist });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new Wishlist();
