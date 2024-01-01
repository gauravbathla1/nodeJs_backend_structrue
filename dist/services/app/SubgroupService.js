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
const S3Constant_1 = require("../../constants/S3Constant");
const FileUpload_1 = require("../../utils/FileUpload");
const SubgroupMember_1 = require("../../models/SubgroupMember");
const GroupMemberModel_1 = require("../../models/GroupMemberModel");
class SubgroupService {
    createGroup(subgroupData, icon, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { groupId, groupName, name, description } = subgroupData;
            const isGroup = yield this.handleGroup(groupId, user);
            if (isGroup.notGroup)
                return { groupNotFound: true };
            if (isGroup.notAdmin)
                return { notAdmin: true };
            //will change member limit on the base of subscription.
            const subgroup = yield SubgroupModel_1.default.create({
                name,
                groupName,
                description,
                groupId,
                memberLimit: 20,
                members: [user._id],
                totalMember: 0,
                createdBy: user._id,
                icon: yield this.uploadIcon(icon)
            });
            const group = isGroup.group;
            yield group.save();
            yield this.createSubgroupMember(subgroup._id, groupId, user._id, true);
            return { subgroup };
        });
    }
    uploadIcon(icon) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileName = `${Date.now()}-${icon.originalFilename}`;
            return yield new FileUpload_1.FileUpload().uploadFileOnS3(icon, S3Constant_1.S3_DIRECTORY.subgruopIcons, fileName);
        });
    }
    createSubgroupMember(subgroupId, groupId, memberId, isAdmin = false) {
        return __awaiter(this, void 0, void 0, function* () {
            yield SubgroupMember_1.default.create({
                subgroupId,
                groupId,
                memberId,
                isAdmin
            });
            yield GroupMemberModel_1.default.updateOne({ member: memberId, group: groupId }, { '$push': { subgroups: subgroupId } });
            return true;
        });
    }
    handleGroup(groupId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const group = yield GroupModel_1.default.findById(groupId);
            if (!group)
                return { notGroup: true };
            if (JSON.stringify(user._id) !== JSON.stringify(group.createdBy))
                return { notAdmin: true };
            /* will uncomment below line once subscription implemented. */
            // if(!group.subGroupSubscribed) return false;
            group.totalSubgroup += 1;
            return { group };
        });
    }
    subgroupDetails(subgroupId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const pipeline = [
                {
                    '$match': {
                        '_id': new mongoose_1.Types.ObjectId(subgroupId)
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
                    '$lookup': {
                        'from': 'groups',
                        'localField': 'groupId',
                        'foreignField': '_id',
                        'as': 'group'
                    }
                }, {
                    '$unwind': {
                        'path': '$group',
                        'preserveNullAndEmptyArrays': true
                    }
                },
                {
                    '$project': {
                        'name': 1,
                        'groupName': 1,
                        'totalMember': 1,
                        'memberLimit': 1,
                        'createdAt': 1,
                        'icon': 1,
                        'description': 1,
                        'createdBy': {
                            '_id': 1,
                            'email': 1,
                            'displayName': 1,
                            'name': 1,
                            'avatar': 1,
                            'customerCode': 1
                        },
                        'group': {
                            '_id': 1,
                            'groupIcon': 1,
                            'name': 1,
                            'groupCode': 1
                        },
                        'isAdmin': {
                            '$eq': [
                                '$createdBy._id', user._id
                            ]
                        }
                    }
                }
            ];
            const result = yield SubgroupModel_1.default.aggregate(pipeline);
            if (!result.length)
                return { subgroupNotFound: true };
            return { subgroup: result[0] };
        });
    }
    listAggPipeline(condition, userId, queryString) {
        const page = Number(queryString.page) * 1 || 1;
        const limit = Number(queryString.limit) * 1 || 10;
        const skip = (page - 1) * limit;
        return [
            {
                '$match': condition
            },
            {
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
                        }, {
                            '$lookup': {
                                'from': 'groups',
                                'localField': 'groupId',
                                'foreignField': '_id',
                                'as': 'group'
                            }
                        }, {
                            '$unwind': {
                                'path': '$group',
                                'preserveNullAndEmptyArrays': true
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
                        }, {
                            '$project': {
                                '_id': 1,
                                'icon': 1,
                                'name': 1,
                                'createdAt': 1,
                                'totalMember': 1,
                                'memberLimit': 1,
                                'description': 1,
                                'group': {
                                    '_id': 1,
                                    'name': 1,
                                    'groupIcon': 1,
                                    'email': 1
                                },
                                'createdBy': {
                                    '_id': 1,
                                    'name': 1,
                                    'avatar': 1,
                                    'displayName': 1
                                },
                                'isJoined': {
                                    '$in': [
                                        userId, '$members'
                                    ]
                                }
                            }
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
    }
    handleSubgroupMemberRemove(subgroupId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let subgroup = yield SubgroupModel_1.default.findById(subgroupId);
            subgroup.members = subgroup.members.filter((e) => JSON.stringify(userId) !== JSON.stringify(e));
            subgroup.totalMember -= 1;
            const groupMember = yield GroupMemberModel_1.default.findOne({ member: userId, group: subgroup.groupId });
            groupMember.subgroups = groupMember.subgroups.filter((e) => JSON.stringify(subgroupId) !== JSON.stringify(e));
            yield groupMember.save();
            yield subgroup.save();
            yield SubgroupMember_1.default.deleteOne({ subgroupId, memberId: userId });
            return true;
        });
    }
    addMember(subgroupId, memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            let subgroup = yield SubgroupModel_1.default.findById(subgroupId);
            if (!subgroup)
                return { subgroupNotFound: true };
            if (subgroup.memberLimit <= subgroup.totalMember)
                return { limitExceed: true };
            if (yield this.checkSubgroupMember(subgroupId, memberId))
                return { alreadyMember: true };
            let groupMember = yield this.checkGroupMember(subgroup.groupId, memberId);
            if (!groupMember)
                return { notGroupMember: true };
            yield this.createSubgroupMember(subgroupId, subgroup.groupId, memberId);
            groupMember.subgroups.push(subgroup._id);
            yield groupMember.save();
            subgroup.members.push(memberId);
            subgroup.totalMember += 1;
            yield subgroup.save();
            return { subgroup };
        });
    }
    checkSubgroupMember(subgroupId, memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            const exist = yield SubgroupMember_1.default.exists({ subgroupId, memberId, isDeleted: false });
            return exist ? true : false;
        });
    }
    checkGroupMember(groupId, memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            const groupMember = yield GroupMemberModel_1.default.findOne({ isDeleted: false, isLeft: false, isRemoved: false, group: groupId, member: memberId });
            return groupMember;
        });
    }
    groupMemberListToAddSubgroup(subgroupId, queryString, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = Number(queryString.page) || 1;
            const limit = Number(queryString.limit) || 10;
            const skip = (page - 1) * limit;
            const subgroup = yield SubgroupModel_1.default.findById(subgroupId);
            if (!subgroup)
                return { subgroupNotExists: true };
            let matchSearch = {};
            if (queryString.search && queryString.search.trim())
                matchSearch = { 'user.name': { '$regex': queryString.search, '$options': '$i' } };
            const pipeline = [
                {
                    '$match': {
                        'isAdmin': false,
                        'isDeleted': false,
                        'isLeft': false,
                        'isRemoved': false,
                        'group': subgroup.groupId,
                        'subgroups': { '$ne': subgroup._id }
                    }
                },
                {
                    '$lookup': {
                        'from': 'users',
                        'localField': 'member',
                        'foreignField': '_id',
                        'as': 'user'
                    }
                },
                {
                    '$unwind': {
                        'path': '$user',
                        'preserveNullAndEmptyArrays': true
                    }
                },
                {
                    '$match': matchSearch
                },
                {
                    '$replaceRoot': {
                        'newRoot': '$user'
                    }
                },
                {
                    '$facet': {
                        'count': [
                            {
                                '$count': 'count'
                            }
                        ],
                        'list': [
                            {
                                '$sort': {
                                    'name': 1
                                }
                            },
                            {
                                '$skip': skip
                            },
                            {
                                '$limit': limit
                            },
                            {
                                '$project': {
                                    'name': 1,
                                    'avatar': 1,
                                    'customerId': 1,
                                    'description': 1,
                                    'facebookProfileUrl': 1,
                                    'linkedinProfileUrl': 1,
                                    'twitterUsername': 1,
                                    'instagramUsername': 1,
                                    'email': 1,
                                    'firstName': 1,
                                    'lastName': 1,
                                    'customerCode': 1
                                }
                            }
                        ]
                    }
                },
                {
                    '$project': {
                        'count': {
                            '$first': '$count.count'
                        },
                        'list': 1
                    }
                }
            ];
            let list = [];
            let count = 0;
            const result = yield GroupMemberModel_1.default.aggregate(pipeline);
            if (result && result.length) {
                list = result[0].list;
                count = result[0].count;
            }
            return { result: { list, count } };
        });
    }
    removeMember(memberId, subgroupId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const member = yield SubgroupMember_1.default.findOne({ memberId, subgroupId });
            if (!member)
                return { memberNotExists: true };
            if (!(yield GroupMemberModel_1.default.exists({ member: user._id, group: member.groupId, isAdmin: true })))
                return { notAdmin: true };
            return { isRemoved: yield this.handleSubgroupMemberRemove(subgroupId, memberId) };
        });
    }
    deleteSubgroup(subgroupId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const subgroup = yield SubgroupModel_1.default.findById(subgroupId);
            if (!subgroup)
                return { subgroupNotExists: true };
            const subgroupMember = yield SubgroupMember_1.default.findOne({ subgroupId, memberId: user._id });
            if (!subgroupMember || !subgroupMember.isAdmin)
                return { notAdmin: true };
            yield GroupMemberModel_1.default.updateMany({ group: subgroup.groupId, member: subgroup.members }, { '$pull': { subgroups: subgroup._id } });
            yield GroupModel_1.default.updateOne({ _id: subgroup.groupId }, { '$inc': { totalSubgroup: -1 } });
            yield subgroup.delete();
            yield SubgroupMember_1.default.deleteMany({ subgroupId });
            return { isDeleted: true };
        });
    }
    editSubgroup(subgroupId, subgroupData, userData, icon = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const { groupId, groupName, name, description } = subgroupData;
            const subgroup = yield SubgroupModel_1.default.findById(subgroupId);
            if (!subgroup)
                return { subgroupNotFound: true };
            if (JSON.stringify(userData._id) !== JSON.stringify(subgroup.createdBy))
                return { notAdmin: true };
            subgroup.groupId = groupId || subgroup.groupId;
            subgroup.groupName = groupName || subgroup.groupName;
            subgroup.name = name || subgroup.name;
            subgroup.description = description || subgroup.description;
            if (icon && typeof icon !== 'string') {
                subgroup.icon = yield this.uploadIcon(icon);
            }
            yield subgroup.save();
            return { subgroup };
        });
    }
}
exports.default = new SubgroupService();
