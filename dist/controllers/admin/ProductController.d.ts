import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
declare class ProductController {
    /**
        * @api {post} /api/v1/admin/product Add Product
        * @apiHeader {String} App-Version Version Code 1.0.0.
        * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF0IjoxNjU3NjkxMjY4LCJleHAiOjE2NTc3Nzc2Njh9.JmW836-NhCtMxWtkD3ezP4aRidSLshjTIgzhIkMYe3w
        * @apiVersion 1.0.0
        * @apiName add-product
        * @apiGroup Admin-Product
        * @apiParam {String} name
        * @apiParam {Number} price
        * @apiParam {String} categoryId
        * @apiParam {String} subcategoryId
        * @apiParam {String} categoryName
        * @apiParam {String} subcategoryName
        * @apiParam {String} author
        * @apiParam {String} stock
        * @apiParam {String} description
        * @apiParam {String} regularPrice
        * @apiParam {Number} salesPrice
        * @apiParam {String} taxClass
        * @apiParam {String} taxStatus
        * @apiParam {Number} stockQuantity
        * @apiParam {Boolean} allowBackOrders
        * @apiParam {Number} lowstockThreshold
        * @apiParam {Number}  soldIndividualStock
        * @apiParam {Number} weight
        * @apiParam {String} weightUnit
        * @apiParam {String} dimension
        * @apiParam {String} shippingClass
        * @apiParam {Boolean} upSells
        * @apiParam {Boolean} crossSells
        * @apiParam {String} color
        * @apiParam {String} material
        * @apiParam {String} purchaseNote
        * @apiParam {String} menuOrder
        * @apiParam {Boolean} isReviewEnabled
        * @apiParam {String} adminCommissionType
        * @apiParam {Number} adminCommission
        * @apiParam {String} productId
        * @apiParam {String} sectionName
        * @apiParam {Array} cashbackTypes
        * @apiParamExample {json} Request-Body:
        *  {
        *    "name":"Tesla Car",
        *    "price":50000,
        *    "categoryId":"62c565ce198c336e57acf4a7",
        *    "subcategoryId":"62cbf77a217ec71559014f5d",
        *    "categoryName":"Electronics",
        *    "subcategoryName":"Digital",
        *    "author":"peter",
        *    "sectionName":"B",
        *    "stock":56,
        *    "description":"this is very amazing",
        *    "regularPrice":"450000",
        *    "salePrice":40000,
        *    "taxClass":"firstclass",
        *    "taxStatus":"acceepted",
        *    "stockQuantity":45,
        *    "allowBackOrders":true,
        *    "lowStockThreshold":34,
        *    "soldIndividualStock":677,
        *    "weight":500,
        *    "weightUnit":"kilogram",
        *    "dimensions":"2d",
        *    "shippingClass":"firstclass",
        *    "upSells":true,
        *    "crossSells":true,
        *    "color":"blue",
        *    "material":"copper",
        *    "purchasedNote":"gfknfk",
        *    "menuOrder":"tltmt",
        *    "isReviewEnabled":true,
        *    "adminCommissionType":"paytm",
        *    "adminCommission":"890",
        *   "cashbackTypes":[{"cashbackType":"rtgphhh","amout":4500}]
        *}
        *
        * @apiSuccessExample {json} Success-Response:
        *HTTP/1.1 200 OK
        *{
        *  "status": 201,
        *  "statusText": "CREATED",
        * "message": "product_created",
        * "data": {
        * "product": {
        *    "name": "Tesla Car",
        *    "sku": "BYJB1GP0VI",
        *    "price": 50000,
        *    "categoryId": "62c565ce198c336e57acf4a7",
        *    "categoryName": "Electronics",
        *    "subcategoryName": "Digital",
        *    "subcategoryId": "62cbf77a217ec71559014f5d",
        *    "author": "peter",
        *    "stock": 56,
        *    "description": "this is very amazing",
        *    "regularPrice": 450000,
        *    "salePrice": 40000,
        *    "taxClass": "firstclass",
        *    "taxStatus": "acceepted",
        *    "stockQuantity": 45,
        *    "allowBackOrders": true,
        *    "lowStockThreshold": 34,
        *    "soldIndividualStock": 677,
        *    "weight": 500,
        *    "weightUnit": "kilogram",
        *    "dimensions": "2d",
        *    "shippingClass": "firstclass",
        *    "upSells": true,
        *    "crossSells": true,
        *    "color": "blue",
        *    "material": "copper",
        *    "purchasedNote": "gfknfk",
        *    "menuOrder": "tltmt",
        *    "isReviewEnabled": true,
        *    "adminCommissionType": "paytm",
        *    "adminCommission": 890,
        *    "isDeleted": false,
        *    "isActive": true,
        *    "cashbackTypes": [
        *        {
        *            "cashbackType": "rtgphhh",
        *            "_id": "62d673902c91e3167bfd75fd"
        *        }
        *    ],
        *    "photos": [],
        *    "_id": "62d673902c91e3167bfd75fc",
        *    "__v": 0
        *},
        *"execTime": 103
        *}
        * }
        *
        */
    add(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
    * @api {get} /api/v1/admin/product Get Product list
    * @apiHeader {String} App-Version Version Code 1.0.0.
    * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF0IjoxNjU3Njk1MzQzLCJleHAiOjE2NTc3ODE3NDN9.HAJ40QWHuL2QeXo3GVQZKziiiQHbLsq0hyuMM-SgfaY
    * @apiVersion 1.0.0
    * @apiName Get-product-list
    * @apiGroup Admin-Product
    * @apiSuccessExample {json} Success-Response:
    *HTTP/1.1 200 OK
    *   {
    * "status": 200,
    * "statusText": "SUCCESS",
    * "message": "product_list",
    *  "data": {
    *   "list": [
    *      {
    *       "isActive": true,
    *       "_id": "62cfb67426bd109f9ae2d7cf",
    *       "name": "Mobile",
    *       "sku": "XUUW1V49R9",
    *       "price": 50000,
    *       "categoryId": "62c565ce198c336e57acf4a7",
    *       "categoryName": "Electronics",
    *       "subcategoryName": "Digital",
    *       "subcategoryId": "62cbf77a217ec71559014f5d",
    *       "author": "samsung",
    *       "stock": 56,
    *       "description": "this is very amazing",
    *       "regularPrice": 40000,
    *       "salePrice": 45000,
    *       "taxClass": "abc",
    *       "taxStatus": "acceepted",
    *       "stockQuantity": 45,
    *       "allowBackOrders": true,
    *       "lowStockThreshold": 34,
    *       "soldIndividualStock": 677,
    *       "weight": 500,
    *       "weightUnit": "gjjgg",
    *       "dimensions": "vfjdfjf",
    *       "shippingClass": "firstclass",
    *       "upSells": true,
    *       "crossSells": true,
    *       "color": "blue",
    *       "material": "fjfgjj",
    *       "purchasedNote": "gfknfk",
    *       "menuOrder": "htgt",
    *       "isReviewEnabled": true,
    *       "adminCommissionType": "defg",
    *       "adminCommission": 890,
    *       "isDeleted": false,
    *       "cashbackTypes": [
    *                    {
    *                        "cashbackType": "rtgphhh",
    *                        "_id": "62cfb67426bd109f9ae2d7d0"
    *                    }
    *                ],
    *                "photos": [],
    *                "coverPhoto": "product/62cfb67426bd109f9ae2d7cf/cover-photo/default.png"
    *            },
    *            {
    *                "isActive": true,
    *                "_id": "62cfb9dc26bd109f9ae2d7dd",
    *                "name": "tablefan",
    *                "sku": "S7XKETDN6G",
    *                "price": 50000,
    *                "categoryId": "62c565ce198c336e57acf4a7",
    *                "categoryName": "Electronics",
    *                "subcategoryName": "Digital",
    *                "subcategoryId": "62cbf77a217ec71559014f5d",
    *                "author": "samsung",
    *                "stock": 56,
    *                "description": "this is very amazing",
    *                "regularPrice": 40000,
    *                "salePrice": 45000,
    *                "taxClass": "abc",
    *                "taxStatus": "acceepted",
    *                "stockQuantity": 45,
    *                "allowBackOrders": true,
    *                "lowStockThreshold": 34,
    *                "soldIndividualStock": 677,
    *                "weight": 500,
    *                "weightUnit": "gjjgg",
    *                "dimensions": "vfjdfjf",
    *                "shippingClass": "firstclass",
    *                "upSells": true,
    *                "crossSells": true,
    *                "color": "blue",
    *                "material": "fjfgjj",
    *                "purchasedNote": "gfknfk",
    *                "menuOrder": "htgt",
    *                "isReviewEnabled": true,
    *                "adminCommissionType": "defg",
    *                "adminCommission": 890,
    *                "isDeleted": false,
    *                "cashbackTypes": [
    *                    {
    *                        "cashbackType": "rtgphhh",
    *                        "_id": "62d1088d6b016289b16830dd"
    *                    }
    *                ],
    *                "photos": [
    *                    "product/62cfb9dc26bd109f9ae2d7dd/photos/annie-spratt-ncQ2sguVlgo-unsplash.jpg"
    *                ],
    *                "coverPhoto": "product/62cfb9dc26bd109f9ae2d7dd/cover-photo/default.jpeg"
    *            },
    *            {
    *                "_id": "62d673902c91e3167bfd75fc",
    *                "name": "Tesla Car",
    *                "sku": "BYJB1GP0VI",
    *                "price": 50000,
    *                "categoryId": "62c565ce198c336e57acf4a7",
    *                "categoryName": "Electronics",
    *                "subcategoryName": "Digital",
    *                "subcategoryId": "62cbf77a217ec71559014f5d",
    *                "author": "peter",
    *                "stock": 56,
    *                "description": "this is very amazing",
    *                "regularPrice": 450000,
    *                "salePrice": 40000,
    *                "taxClass": "firstclass",
    *                "taxStatus": "acceepted",
    *                "stockQuantity": 45,
    *                "allowBackOrders": true,
    *                "lowStockThreshold": 34,
    *                "soldIndividualStock": 677,
    *                "weight": 500,
    *                "weightUnit": "kilogram",
    *                "dimensions": "2d",
    *                "shippingClass": "firstclass",
    *                "upSells": true,
    *                "crossSells": true,
    *                "color": "blue",
    *                "material": "copper",
    *                "purchasedNote": "gfknfk",
    *                "menuOrder": "tltmt",
    *                "isReviewEnabled": true,
    *                "adminCommissionType": "paytm",
    *                "adminCommission": 890,
    *                "isDeleted": false,
    *                "isActive": true,
    *                "cashbackTypes": [
    *                    {
    *                        "cashbackType": "rtgphhh",
    *                        "_id": "62d673902c91e3167bfd75fd"
    *                    }
    *                ],
    *                "photos": []
    *            }
    *        ],
    *        "count": 4,
    *        "execTime": 468
    *    }
    *     }
    *
    */
    list(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
   * @api {put} /api/v1/admin/product/_id Upload Product Image
   * @apiHeader {String} App-Version Version Code 1.0.0.
   * @apiVersion 1.0.0
   * @apiName upload-image
   * @apiGroup Admin-Product
   * @apiParam {File} image.
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *    {"status":201,"statusText":"CREATED","message":"photo_uploaded","data":{"product":{"_id":"62ce65a3aa1ac7033c583ec9","name":"Watercooler","sku":"QL8E9T9JJG","price":50000,"categoryId":"62c565ce198c336e57acf4a7","categoryName":"Electronics","subcategoryName":"Digital","subcategoryId":"62cbf77a217ec71559014f5d","author":"samsung","stock":56,"description":"this is very amazing","regularPrice":40000,"salePrice":45000,"taxClass":"abc","taxStatus":"acceepted","stockQuantity":45,"allowBackOrders":true,"lowStockThreshold":34,"soldIndividualStock":677,"weight":500,"weightUnit":"gjjgg","dimensions":"vfjdfjf","shippingClass":"firstclass","upSells":true,"crossSells":true,"color":"blue","material":"fjfgjj","purchasedNote":"gfknfk","menuOrder":"htgt","isReviewEnabled":true,"adminCommissionType":"defg","adminCommission":890,"cashbackTypes":[{"cashbackType":"rtgphhh","_id":"62ce65a3aa1ac7033c583eca"}],"photos":["product/62ce65a3aa1ac7033c583ec9/photos/wefundUS.png"],"__v":0,"isDeleted":true,"coverPhoto":"product/62ce65a3aa1ac7033c583ec9/cover-photo/default.png"},"execTime":12430}}
   *
   */
    uploadImage(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
      * @api {put} /api/v1/admin/product/_id Change CoverPhoto Product
      * @apiHeader {String} App-Version Version Code 1.0.0.
      * @apiVersion 1.0.0
      * @apiName change-coverImage
      * @apiGroup Admin-Product
      * @apiParam {File} coverPhot
      * @apiSuccessExample {json} Success-Response:
      *     HTTP/1.1 200 OK
      *   {"status":200,"statusText":"SUCCESS","message":"coverPhoto_uploaded","data":{"product":{"_id":"62cfb67426bd109f9ae2d7cf","name":"Mobile","sku":"XUUW1V49R9","price":50000,"categoryId":"62c565ce198c336e57acf4a7","categoryName":"Electronics","subcategoryName":"Digital","subcategoryId":"62cbf77a217ec71559014f5d","author":"samsung","stock":56,"description":"this is very amazing","regularPrice":40000,"salePrice":45000,"taxClass":"abc","taxStatus":"acceepted","stockQuantity":45,"allowBackOrders":true,"lowStockThreshold":34,"soldIndividualStock":677,"weight":500,"weightUnit":"gjjgg","dimensions":"vfjdfjf","shippingClass":"firstclass","upSells":true,"crossSells":true,"color":"blue","material":"fjfgjj","purchasedNote":"gfknfk","menuOrder":"htgt","isReviewEnabled":true,"adminCommissionType":"defg","adminCommission":890,"isDeleted":false,"cashbackTypes":[{"cashbackType":"rtgphhh","_id":"62cfb67426bd109f9ae2d7d0"}],"photos":[],"__v":1,"coverPhoto":"product/62cfb67426bd109f9ae2d7cf/cover-photo/default.png"},"execTime":11064}}
      *
      */
    changeCoverImage(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
        * @api {put} /api/v1/admin/product/edit/id Edit Product
        * @apiHeader {String} App-Version Version Code 1.0.0.
        * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF0IjoxNjU3Nzk4NTU4LCJleHAiOjE2NTc4ODQ5NTh9.8K6BRcRLY49xmeAx-nHYRh12QclyhA6YF2A0RBypjdQ
        * @apiVersion 1.0.0
        * @apiName edit-product
        * @apiGroup Admin-Product
        * @apiParam {String} name
        * @apiParam {Number} price
        * @apiParam {String} categoryId
        * @apiParam {String} subcategoryId
        * @apiParam {String} categoryName
        * @apiParam {String} subcategoryName
        * @apiParam {String} author
        * @apiParam {String} stock
        * @apiParam {String} description
        * @apiParam {String} regularPrice
        * @apiParam {Number} salesPrice
        * @apiParam {String} taxClass
        * @apiParam {String} taxStatus
        * @apiParam {Number} stockQuantity
        * @apiParam {Boolean} allowBackOrders
        * @apiParam {Number} lowstockThreshold
        * @apiParam {Number}  soldIndividualStock
        * @apiParam {Number} weight
        * @apiParam {String} weightUnit
        * @apiParam {String} dimension
        * @apiParam {String} shippingClass
        * @apiParam {Boolean} upSells
        * @apiParam {Boolean} crossSells
        * @apiParam {String} color
        * @apiParam {String} material
        * @apiParam {String} purchaseNote
        * @apiParam {String} menuOrder
        * @apiParam {Boolean} isReviewEnabled
        * @apiParam {String} adminCommissionType
        * @apiParam {Number} adminCommission
        * @apiParam {String} productId
        * @apiParam {String} sectionName
        * @apiParam {Array} cashbackTypes
        * @apiParamExample {json} Request-Body:
        * {
        *    "name":"Ball",
        *     "price":5000,
        *     "categoryId":"62f5dcf020098408379216ae",
        *     "subcategoryId":"62f5dd0b20098408379216bf",
        *     "categoryName":"Sports",
        *     "subcategoryName":"Cricket Bat",
        *     "author":"SportsZone",
        *    "sectionName":"Sports",
        *    "stock":200,
        *    "brandId":"62f5e10b2009840837921794",
        *    "description":"it is used for play for children",
        *    "regularPrice":"3000",
        *    "salePrice":2000,
        *    "taxClass":"School Supplies",
        *    "taxStatus":"acceepted",
        *    "stockQuantity":200,
        *    "allowBackOrders":true,
        *    "lowStockThreshold":30,
        *    "soldIndividualStock":300,
        *    "weight":20,
        *    "weightUnit":"kg",
        *    "dimensions":"3 dimensions",
        *    "shippingClass":"cashOn",
        *    "upSells":true,
        *    "crossSells":true,
        *    "colors":["blue","Red","Green"],
        *    "material":"woods",
        *    "purchasedNote":"this bat is used for leather",
        *    "menuOrder":"sportcomplex",
        *    "isReviewEnabled":true,
        *    "adminCommissionType":"gold",
        *    "adminCommission":"890",
        *    "cashbackTypes":[{"cashbackType":"silver"}]
        *     }
        *     @apiSuccessExample {json} Success-Response:
        async delete(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {
            const wishlistId = req.params.id;
            const wishlist = await WishlistService.delete(wishlistId);
            if (wishlist) {
                res.logMsg = 'Wishlist deleted successfully';
                ResponseHelper.ok(res, res.__('wishlist_deleted'), { wishlist });
            }
        } catch (error) {
            next(error);
        }
    }*    HTTP/1.1 200 OK
        *     {
        *    "status": 200,
        *    "statusText": "SUCCESS",
        *    "message": "Product edited successfully",
        *   "data": {
        *     "product": {
        *    "_id": "62f5ee73f3a7e3dfc73acf00",
        *    "name": "Ball",
        *    "sku": "7R3K2VGYDZ",
        *    "categoryId": "62f5dcf020098408379216ae",
        *    "categoryName": "Sports",
        *    "subcategoryName": "Cricket Bat",
        async delete(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {
            const wishlistId = req.params.id;
            const wishlist = await WishlistService.delete(wishlistId);
            if (wishlist) {
                res.logMsg = 'Wishlist deleted successfully';
                ResponseHelper.ok(res, res.__('wishlist_deleted'), { wishlist });
            }
        } catch (error) {
            next(error);
        }
    }*    "author": "SportsZone",
        *    "stock": 200,
        *    "description": "it is used for play for children",
        *    "regularPrice": 3000,
        *    "salePrice": 2000,
        *    "taxClass": "School Supplies",
        *    "taxStatus": "acceepted",
        *    "taxClassCode": "81111705A0000",
        *    "stockQuantity": 200,
        *    "allowBackOrders": true,
        *    "lowStockThreshold": 30,
        *    "soldIndividualStock": 300,
        *    "weight": 20,
        async delete(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {
            const wishlistId = req.params.id;
            const wishlist = await WishlistService.delete(wishlistId);
            if (wishlist) {
                res.logMsg = 'Wishlist deleted successfully';
                ResponseHelper.ok(res, res.__('wishlist_deleted'), { wishlist });
            }
        async delete(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {
            const wishlistId = req.params.id;
            const wishlist = await WishlistService.delete(wishlistId);
            if (wishlist) {
                res.logMsg = 'Wishlist deleted successfully';
                ResponseHelper.ok(res, res.__('wishlist_deleted'), { wishlist });
            }
        } catch (error) {
            next(error);
        }
    }} catch (error) {
            next(error);
        }
    }*    "weightUnit": "kg",
        *    "dimensions": "3 dimensions",
        *    "shippingClass": "cashOn",
        *    "upSells": true,
        *    "crossSells": true,
        *    "material": "woods",
        *    "purchasedNote": "this bat is used for leather",
        *    "menuOrder": "sportcomplex",
        *    "isReviewEnabled": true,
        *    "adminCommissionType": "gold",
        *    "adminCommission": 890,
        *    "isDeleted": false,
        *    "isActive": true,
        *    "cashbackTypes": [
        *        {
        *            "cashbackType": "silver",
        *            "_id": "62f5f5382dade01b343347c2"
        *        }
        *    ],
        *    "photos": [
        *        "product/62f5ee73f3a7e3dfc73acf00/photos/bats.jpg",
        *        "product/62f5ee73f3a7e3dfc73acf00/photos/profile.png",
        *        "product/62f5ee73f3a7e3dfc73acf00/photos/shirt.jpg",
        *        "product/62f5ee73f3a7e3dfc73acf00/photos/shirt2.jpeg"
        *    ],
        *    "colors": [
        *        "blue",
        *        "Red",
        *        "Green"
        *    ],
        *    "ratingsTotal": 0,
        *    "ratingsAvg": 0,
        *    "totalReports": 0,
        *    "productSold": 0,
        *    "attributeValues": [],
        *    "attributes": [],
        *    "createdAt": "2022-08-12T06:08:51.618Z",
        *    "updatedAt": "2022-08-12T06:37:44.551Z",
        *    "__v": 0,
        *    "coverPhoto": "product/62f5ee73f3a7e3dfc73acf00/cover-photo/default.jpeg"
        * },
        * "execTime": 75
        * }
        * }
        **/
    edit(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
      * @api {delete} /api/v1/admin/product/_id Delete Product
      * @apiHeader {String} App-Version Version Code 1.0.0.
      * @apiHeader {String} Authorization
      * @apiVersion 1.0.0
      * @apiName Delete Product
      * @apiGroup Admin-Product
      * @apiDescription pass product _id as params
      * @apiSuccessExample {json} Success-Response:
      * HTTP/1.1 200 OK
      *
      * {
      * {
      * "status": 200,
      * "statusText": "SUCCESS",
      * "message": "Product deleted successfully",
      * "data": {
      *  "product": {
      *      "_id": "62ce65a3aa1ac7033c583ec9",
      *      "name": "Watercooler",
      *      "sku": "QL8E9T9JJG",
      *      "price": 50000,
      *      "categoryId": "62c565ce198c336e57acf4a7",
      *      "categoryName": "Electronics",
      *      "subcategoryName": "Digital",
      *      "subcategoryId": "62cbf77a217ec71559014f5d",
      *      "author": "samsung",
      *      "stock": 56,
      *      "description": "this is very amazing",
      *      "regularPrice": 40000,
      *      "salePrice": 45000,
      *      "taxClass": "abc",
      *      "taxStatus": "acceepted",
      *      "stockQuantity": 45,
      *      "allowBackOrders": true,
      *      "lowStockThreshold": 34,
      *      "soldIndividualStock": 677,
      *      "weight": 500,
      *      "weightUnit": "gjjgg",
      *      "dimensions": "vfjdfjf",
      *      "shippingClass": "firstclass",
      *      "upSells": true,
      *      "crossSells": true,
      *      "color": "blue",
      *      "material": "fjfgjj",
      *      "purchasedNote": "gfknfk",
      *      "menuOrder": "htgt",
      *      "isReviewEnabled": true,
      *      "adminCommissionType": "defg",
      *      "adminCommission": 890,
      *      "cashbackTypes": [
      *          {
      *              "cashbackType": "rtgphhh",
      *              "_id": "62ce65a3aa1ac7033c583eca"
      *          }
      *      ],
      *      "photos": [],
      *      "__v": 0,
      *      "isDeleted": true
      *  },
      *  "execTime": 67
      * }
      * }
      *
      */
    delete(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    deleteCoverImage(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    deletePhoto(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    fetchProduct(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
   * @api {patch} /api/v1/admin/product/_id/status Update Status Product
   * @apiHeader {String} App-Version Version Code 1.0.0.
   * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZDkzODExMDgyMDE1MGUzODI5MjgxOCIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF0IjoxNjU4NDAyODU4LCJleHAiOjE2NTg0ODkyNTh9.OdgFA-wyMD82itAqPFaLdPGh-HitGUA9ft9l_vGWcDo
   * @apiVersion 1.0.0
   * @apiName update-status-product
   * @apiGroup Admin-Product
   * @apiDescription pass product _id as params
   * @apiSuccessExample {json} Success-Response:
   *HTTP/1.1 200 OK
   * {
   * "status": 200,
   * "statusText": "SUCCESS",
   *  "message": "Product update status  successfully",
   *  "data": {
   *    "_id": "62d7cccc86616ebe475db688",
   *    "name": "samsung",
   *    "sku": "54JI1QD9BL",
   *    "categoryId": "62d0136cff9b93f5383b08b1",
   *    "categoryName": "does nt updated trying 32",
   *    "subcategoryName": "testinggg",
   *    "subcategoryId": "62d15e22ff9b93f5383b5815",
   *    "author": "testedd",
   *    "stock": 3400,
   *    "description": "testeddddd",
   *    "regularPrice": 1000,
   *    "salePrice": 2000,
   *    "taxClass": "testedd",
   *    "taxStatus": "accepted",
   *    "stockQuantity": 2000,
   *    "allowBackOrders": true,
   *    "lowStockThreshold": 300,
   *    "soldIndividualStock": 2000,
   *    "weight": 24,
   *    "weightUnit": "kg",
   *    "dimensions": "3dimensions",
   *    "shippingClass": "2000",
   *    "upSells": true,
   *    "crossSells": false,
   *    "color": "red",
   *    "material": "teteddddd",
   *    "purchasedNote": "testedd",
   *    "menuOrder": "testedd",
   *    "isReviewEnabled": true,
   *    "adminCommissionType": "tetedd",
   *    "adminCommission": 200,
   *    "isDeleted": false,
   *    "isActive": false,
   *    "cashbackTypes": [
   *        {
   *            "cashbackType": "IndividualUser",
   *            "amount": 1000,
   *            "_id": "62d7d698c075177dd13a9006"
   *        },
   *        {
   *            "cashbackType": "GoldCashback",
   *            "amount": 5000,
   *            "_id": "62d7d698c075177dd13a9007"
   *        },
   *        {
   *            "cashbackType": "BronzeCashback",
   *            "amount": 3000,
   *            "_id": "62d7d698c075177dd13a9008"
   *        },
   *        {
   *            "cashbackType": "SilverCashback",
   *            "amount": 6000,
   *            "_id": "62d7d698c075177dd13a9009"
   *        }
   *    ],
   *    "photos": [
   *        "product/62d7cccc86616ebe475db688/photos/download.jpeg",
   *        "product/62d7cccc86616ebe475db688/photos/download (1).jpeg",
   *        "product/62d7cccc86616ebe475db688/photos/profile.png"
   *    ],
   *    "__v": 0,
   *    "coverPhoto": "product/62d7cccc86616ebe475db688/cover-photo/default.jpeg",
   *    "sectionName": "tesedd checkingg"
   * }
   * }
   *
   */
    activeupdateStatus(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
   * @api {patch} /api/v1/admin/product/_id/attributes Add attributes
   * @apiHeader {String} App-Version Version Code 1.0.0.
   * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZDkzODExMDgyMDE1MGUzODI5MjgxOCIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF0IjoxNjU4NDAyODU4LCJleHAiOjE2NTg0ODkyNTh9.OdgFA-wyMD82itAqPFaLdPGh-HitGUA9ft9l_vGWcDo
   * @apiVersion 1.0.0
   * @apiName attributes
   * @apiGroup Admin-Product
   * @apiDescription pass product _id as params
   *
   * @apiParamExample {json} Request body
   * {
   *        "attributes": [
   *            {
   *                "name": "sizes",
   *                "values": [
   *                    "x",
   *                    "M",
   *                    "XL"
   *                ]
   *            },
   *            {
   *                "name": "fabric",
   *                "values": ["cotten"]
   *            },
   *            {
   *                "name": "patters",
   *                "values":["stripped"]
   *            }
   *        ]
   *    }
   *
   * @apiSuccessExample {json} Success-Response:
   * {
   *        "status": 200,
   *        "statusText": "SUCCESS",
   *        "message": "attributes_added",
   *        "data": {
   *            "product": {
   *                "_id": "62f211f7e5b04048b1531639",
   *                "attributes": [
   *                    {
   *                        "name": "sizes",
   *                        "values": [
   *                            "x",
   *                            "M",
   *                            "XL"
   *                        ]
   *                    },
   *                    {
   *                        "name": "fabric",
   *                        "values": [
   *                            "cotten"
   *                        ]
   *                    },
   *                    {
   *                        "name": "patters",
   *                        "values": [
   *                            "stripped"
   *                        ]
   *                    }
   *                ]
   *            },
   *            "execTime": 593
   *        }
   *    }
   *
   * */
    addAttributes(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    test(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: ProductController;
export default _default;
