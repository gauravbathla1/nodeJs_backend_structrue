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
const GroupModel_1 = require("../../models/GroupModel");
const mongoose_1 = require("mongoose");
const SubgroupModel_1 = require("../../models/SubgroupModel");
const GroupMemberModel_1 = require("../../models/GroupMemberModel");
const SubgroupMember_1 = require("../../models/SubgroupMember");
const GroupMemberInterface_1 = require("../../interfaces/GroupMemberInterface");
class GroupService {
    /**
     *
     * @param groupId
     * @returns Promise<any>
     */
    groupDetails(groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            const pipeline = [
                {
                    '$match': {
                        '_id': new mongoose_1.Types.ObjectId(groupId)
                    }
                }, {
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
                    '$lookup': {
                        'from': 'grouppurposes',
                        'localField': 'purposeId',
                        'foreignField': '_id',
                        'as': 'purpose'
                    }
                }, {
                    '$unwind': {
                        'path': '$purpose',
                        'preserveNullAndEmptyArrays': true
                    }
                },
                {
                    '$lookup': {
                        'from': 'subgroups',
                        'localField': '_id',
                        'foreignField': 'groupId',
                        'as': 'subgroups'
                    }
                },
                {
                    '$project': {
                        'groupCode': 1,
                        'name': 1,
                        'totalMembers': 1,
                        'goalPrice': 1,
                        'goalInterval': 1,
                        'groupIcon': 1,
                        'description': 1,
                        'showContactInfo': 1,
                        'showSocialInfo': 1,
                        'phoneNumber': 1,
                        'email': 1,
                        'address': 1,
                        'subGroupLimit': 1,
                        'totalSubgroup': 1,
                        'facebookUrl': 1,
                        'twitterUrl': 1,
                        'city': 1,
                        'state': 1,
                        'zipCode': 1,
                        'subgroups': 1,
                        'createdBy': {
                            '_id': 1,
                            'avatar': 1,
                            'displayName': 1,
                            'customerCode': 1,
                            'email': 1,
                            'name': 1
                        },
                        'purpose': {
                            '_id': 1,
                            'text': 1
                        },
                    }
                }
            ];
            let group = {};
            const groupData = yield GroupModel_1.default.aggregate(pipeline);
            if (groupData.length) {
                group = groupData[0];
            }
            return group;
        });
    }
    deleteGroups(groupIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const groups = yield GroupModel_1.default.find({ _id: groupIds });
            for (const group of groups) {
                group.isDeleted = true;
                yield GroupMemberModel_1.default.updateMany({ group: group._id }, { isDeleted: true });
                yield SubgroupModel_1.default.deleteMany({ groupId: group._id });
                yield SubgroupMember_1.default.deleteMany({ groupId: group._id });
                yield group.save();
            }
            return true;
        });
    }
    groupMemberList(groupId, skip, limit, search) {
        return __awaiter(this, void 0, void 0, function* () {
            let match = {};
            if (search && search.trim()) {
                match = {
                    '$or': [
                        {
                            'member.email': {
                                '$regex': search,
                                '$options': '$i'
                            }
                        }, {
                            'member.displayName': {
                                '$regex': search,
                                '$options': '$i'
                            }
                        }, {
                            'member.name': {
                                '$regex': search,
                                '$options': '$i'
                            }
                        }
                    ]
                };
            }
            const pipeline = [
                {
                    '$match': {
                        'group': new mongoose_1.Types.ObjectId(groupId),
                        'groupRequestStatus': {
                            '$ne': GroupMemberInterface_1.GroupRequestStatus.rejected
                        },
                        'isLeft': false,
                        'isRemoved': false,
                        'isDeleted': false,
                    }
                },
                {
                    '$lookup': {
                        'from': 'users',
                        'localField': 'member',
                        'foreignField': '_id',
                        'as': 'member'
                    }
                }, {
                    '$unwind': {
                        'path': '$member',
                        'preserveNullAndEmptyArrays': true
                    }
                }, {
                    '$project': {
                        'isAdmin': 1,
                        'groupRequestStatus': 1,
                        'createdAt': 1,
                        'member': {
                            '_id': 1,
                            'email': 1,
                            'customerCode': 1,
                            'firstName': 1,
                            'lastName': 1,
                            'name': 1,
                            'displayName': 1,
                            'avatar': 1,
                            'city': 1,
                        }
                    }
                }, {
                    '$match': match
                }, {
                    '$facet': {
                        'count': [
                            {
                                '$count': 'count'
                            }
                        ],
                        'list': [
                            {
                                '$sort': {
                                    'createdAt': -1
                                }
                            }, {
                                '$skip': skip
                            }, {
                                '$limit': limit
                            }
                        ]
                    }
                }, {
                    '$project': {
                        'count': {
                            '$first': '$count.count'
                        },
                        'list': 1
                    }
                }
            ];
            const groupMemberData = yield GroupMemberModel_1.default.aggregate(pipeline);
            let count = 0;
            let list = [];
            if (groupMemberData.length) {
                count = groupMemberData[0].count;
                list = groupMemberData[0].list;
            }
            return { count, list };
        });
    }
}
exports.default = new GroupService();
