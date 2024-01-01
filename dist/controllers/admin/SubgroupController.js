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
const SubgroupModel_1 = require("../../models/SubgroupModel");
const ApiFeatures_1 = require("../../utils/ApiFeatures");
const SubgroupService_1 = require("../../services/admin/SubgroupService");
class SubgroupController {
    /**
        * @api {get} /api/v1/admin/subgroup Subgroup list
        * @apiHeader {String} App-Version Version Code 1.0.0.
        * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
        * @apiVersion 1.0.0
        * @apiName get-subgroup-list
        * @apiGroup Admin-Subgroup
        * @apiSuccessExample {json} Success-Response
            *
            *    {
            *        "status": 200,
            *        "statusText": "SUCCESS",
            *        "message": "Subgroup list fetched.",
            *        "data": {
            *            "count": 3,
            *            "list": [
            *                {
            *                    "_id": "6329bfe5078d13c6551f0096",
            *                    "name": "test subgroup",
            *                    "description": "testing description",
            *                    "icon": "subgroup-icons/1663680483894-1658308824367-Screenshot_1.png",
            *                    "totalMember": 1,
            *                    "memberLimit": 20,
            *                    "createdBy": {
            *                        "_id": "62dfcb21fb89c4b45de44685",
            *                        "avatar": "user-profiles/1659706277298-pukhraj_saini_mce242.png",
            *                        "displayName": "pk",
            *                        "name": "pukhraj saini"
            *                    },
            *                    "createdAt": "2022-09-20T13:28:05.563Z",
            *                    "group": {
            *                        "_id": "631867a72f264cd844f1949b",
            *                        "groupIcon": null,
            *                        "name": "test",
            *                        "email": "test@gmail.com"
            *                    },
            *                    "isJoined": true
            *                }
            *            ],
            *            "execTime": 83
            *        }
            *    }
            */
    subgroupList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryString = req.query;
                const query = SubgroupModel_1.default.find({ isDeleted: false });
                const countQuery = SubgroupModel_1.default.find({ isDeleted: false });
                const listFeature = new ApiFeatures_1.ApiFeatures(query, queryString)
                    .filtering()
                    .searching(['name'])
                    .sorting('-createdAt')
                    .pagination();
                const countFeature = new ApiFeatures_1.ApiFeatures(countQuery, queryString)
                    .filtering()
                    .searching(['name'])
                    .getCount();
                const count = yield countFeature.query;
                const list = yield listFeature.query;
                res.logMsg = 'Subgroup list fetched.';
                return ResponseHelper_1.default.ok(res, res.__('subgroup_list'), { list, count });
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
      * @api {get} api/v1/admin/subgroup/:id Subgroup Details
      * @apiHeader {String} App-Version Version Code 1.0.0.
      * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
      * @apiVersion 1.0.0
      * @apiName subgroup-details
      * @apiGroup Admin-Subgroup
      * @apiSuccessExample {json} Success-Response
      * {
      *"status": 200,
      *"statusText": "SUCCESS",
      *"message": "subgroup_details",
      *"data": {
      *   "subgroup": {
      *        "_id": "6331315a4451d28defe29202",
      *       "groupId": "6322cd3986d65b0926de0cfa",
      *        "groupName": "Down",
      *        "description": "rhefbe",
      *        "icon": "subgroup-icons/1664358096623-image_1648533556788.png",
      *       "totalMember": 1,
      *        "memberLimit": 20,
      *        "createdBy": {
      *            "_id": "631f29486ec923e37efccb94",
      *            "email": "deepanshu.sharma@mobilecoderz.com",
      *            "customerCode": "WFU193230",
      *            "avatar": "user-profiles/1663574288842-Screenshot (4).png",
      *            "displayName": "SharmaDeepanshu",
      *            "name": "Deepanshu Sharma"
      *        },
      *        "group": [
      *            {
      *                "_id": "6322cd3986d65b0926de0cfa",
      *                "groupIcon": "group-icons/1663226219359-Screenshot (4).png",
      *                "groupCode": "GT2240198",
      *                "name": "Down",
      *                "description": "Basic",
      *                "email": "ved@123gmail.com"
      *            }
      *        ]
      *    },
      *    "execTime": 106
      *    }
      *}
      *
      */
    subgroupDetails(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subgroupId = req.params.id;
                const exist = yield SubgroupModel_1.default.exists({ _id: subgroupId });
                if (!exist) {
                    return ResponseHelper_1.default.badRequest(res, res.__('subgroup_does_not_exist'));
                }
                const subgroup = yield SubgroupService_1.default.subgroupDetails(subgroupId);
                return ResponseHelper_1.default.ok(res, res.__('subgroup_details'), { subgroup });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new SubgroupController();
