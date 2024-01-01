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
const S3Constant_1 = require("../../constants/S3Constant");
const ResponseHelper_1 = require("../../helpers/ResponseHelper");
const SlugHelper_1 = require("../../helpers/SlugHelper");
const CategoryModel_1 = require("../../models/CategoryModel");
const SubcategoryModel_1 = require("../../models/SubcategoryModel");
const CategoryService_1 = require("../../services/admin/CategoryService");
const SearchService_1 = require("../../services/admin/SearchService");
const SubcategoryService_1 = require("../../services/admin/SubcategoryService");
class SubcategoryController {
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
    add(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const name = req.body.name;
                const categoryId = req.body.category;
                const image = req.body.image;
                const category = yield CategoryModel_1.default.findById(categoryId);
                const slug = yield (0, SlugHelper_1.generateSlug)(name, 'Subcategory');
                const isExist = yield SubcategoryModel_1.default.exists({ slug, categorySlug: category.slug });
                if (isExist) {
                    return ResponseHelper_1.default.conflict(res, res.__('subcategory_already_exist'));
                }
                const subcategory = yield SubcategoryService_1.default.add(name, categoryId, category.slug, slug, image);
                if (subcategory) {
                    res.logMsg = "Subcategory added successfully";
                    ResponseHelper_1.default.created(res, res.__("subcategory_created"), {
                        subcategory,
                    });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
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
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = req.params.id;
                const name = req.body.name;
                const image = req.body.image;
                const categoryId = req.body.category;
                const category = yield CategoryModel_1.default.findById(categoryId);
                const subcategoryExists = yield SubcategoryModel_1.default.findById(_id);
                let slug = subcategoryExists.slug;
                if (name !== subcategoryExists.name) {
                    slug = yield (0, SlugHelper_1.generateSlug)(name, 'Subcategory');
                }
                const subcategory = yield SubcategoryService_1.default.update(_id, name, categoryId, image, slug, category.slug);
                if (subcategory) {
                    res.logMsg = "Subcategory updated successfully";
                    ResponseHelper_1.default.ok(res, res.__("subcategory_updated"), { subcategory });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
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
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                let subcategory = yield SubcategoryService_1.default.get(id);
                if (subcategory) {
                    let category = yield CategoryService_1.default.findCategory(subcategory.category);
                    res.logMsg = "Subcategory List";
                    ResponseHelper_1.default.ok(res, res.__("subcategory_list"), { subcategory, category });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
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
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const isDeleted = true;
                let subcategory = yield SubcategoryService_1.default.delete(id, isDeleted);
                if (subcategory) {
                    res.logMsg = "Subcategory Deleted";
                    ResponseHelper_1.default.ok(res, res.__("subcategory_deleted"), { subcategory });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
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
    uploadImage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const image = req.files.image;
                if (!image)
                    return ResponseHelper_1.default.badRequest(res, res.__("image_is_required"));
                const data = yield CategoryService_1.default.uploadImage(image, S3Constant_1.S3_DIRECTORY.subCategory);
                if (data === null || data === void 0 ? void 0 : data.url) {
                    res.logMsg = "Subcategory image uploaded successfully";
                    return ResponseHelper_1.default.created(res, res.__("image_uploaded"), data);
                }
                else {
                    return ResponseHelper_1.default.serverError(res, res.__("s3_error"));
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
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
    list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryString = req.query;
                const categoryId = req.params.id;
                const data = yield SubcategoryService_1.default.list(queryString, categoryId);
                if (data) {
                    res.logMsg = `SubCategory list fetched Successfully`;
                    return ResponseHelper_1.default.ok(res, res.__("subcategory_list"), data);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
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
    activeupdateStatus(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let SubcategoryId = req.params.id;
                let Subcategory = yield SubcategoryModel_1.default.findOne({
                    "_id": SubcategoryId
                });
                Subcategory.isActive = !Subcategory.isActive;
                Subcategory.save();
                yield SearchService_1.default.updateSubcategoryDocument(Subcategory, false);
                res.logMsg = 'Subcategory status changed  successfully';
                return ResponseHelper_1.default.ok(res, res.__('subcategory_changed_status'), Subcategory);
            }
            catch (error) {
                next(error);
            }
        });
    }
    ;
}
exports.default = new SubcategoryController();
