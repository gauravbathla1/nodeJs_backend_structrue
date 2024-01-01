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
const SubgroupModel_1 = require("../../models/SubgroupModel");
const mongoose_1 = require("mongoose");
class SubgroupService {
    /**
     *
     * @param subgroupId
     * @returns Promise<any>
     */
    subgroupDetails(subgroupId) {
        return __awaiter(this, void 0, void 0, function* () {
            const pipeline = [
                {
                    '$match': {
                        '_id': new mongoose_1.Types.ObjectId(subgroupId)
                    }
                }, {
                    '$lookup': {
                        'from': 'groups',
                        'localField': 'groupId',
                        'foreignField': '_id',
                        'as': 'group'
                    }
                },
                {
                    '$lookup': {
                        'from': 'users',
                        'localField': 'createdBy',
                        'foreignField': '_id',
                        'as': 'createdBy'
                    }
                }, {
                    '$unwind': {
                        'path': '$createdBy',
                        'preserveNullAndEmptyArrays': true
                    }
                },
                {
                    '$project': {
                        'groupName': 1,
                        'groupId': 1,
                        'description': 1,
                        'icon': 1,
                        'totalMember': 1,
                        'memberLimit': 1,
                        'createdBy': {
                            '_id': 1,
                            'avatar': 1,
                            'displayName': 1,
                            'customerCode': 1,
                            'email': 1,
                            'name': 1
                        },
                        'group': {
                            '_id': 1,
                            'groupIcon': 1,
                            'groupCode': 1,
                            'name': 1,
                            'email': 1,
                            'description': 1
                        },
                    }
                }
            ];
            let subgroup = {};
            const subgroupData = yield SubgroupModel_1.default.aggregate(pipeline);
            if (subgroupData.length) {
                subgroup = subgroupData[0];
            }
            return subgroup;
        });
    }
}
exports.default = new SubgroupService();
