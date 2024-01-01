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
const GroupModel_1 = require("../../models/GroupModel");
const GroupPurPoseModel_1 = require("../../models/GroupPurPoseModel");
const FileUpload_1 = require("../../utils/FileUpload");
const mongoose_1 = require("mongoose");
const GroupMemberInterface_1 = require("../../interfaces/GroupMemberInterface");
const GroupMemberModel_1 = require("../../models/GroupMemberModel");
const Auth_1 = require("../../utils/Auth");
const UserModel_1 = require("../../models/UserModel");
const GroupRequestService_1 = require("./GroupRequestService");
const SubgroupModel_1 = require("../../models/SubgroupModel");
const SubgroupService_1 = require("./SubgroupService");
class GroupService {
    /**
     *
     * @param photo
     * @returns uploaded photo url.
     */
    UploadPhoto(photo) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileName = `${Date.now()}-${photo.originalFilename}`;
            return yield new FileUpload_1.FileUpload().uploadFileOnS3(photo, S3Constant_1.S3_DIRECTORY.groupIcons, fileName);
        });
    }
    /**
     *
     * @param name
     * @returns groupPurpose of interface GroupPurposeInterface.
     */
    handleGroupPurpose(purpose, others) {
        return __awaiter(this, void 0, void 0, function* () {
            let groupPurpose = null;
            /* others is in string bcoz of formdata */
            if (others.toString() === 'false') {
                groupPurpose = yield GroupPurPoseModel_1.default.findById(purpose);
                return groupPurpose;
            }
            groupPurpose = new GroupPurPoseModel_1.default();
            groupPurpose.text = purpose;
            yield groupPurpose.save();
            return groupPurpose;
        });
    }
    /**
     *
     * @param groupData group data to be saved.
     * @param purpose  purpose may be an ObjectId or string.
     * @param others whether purpose is ObjectId or not.
     * @param groupIcon file for group icon.
     * @returns data of type GroupInterface.
     */
    createGroup(userId, groupData, purpose, others, groupIcon) {
        return __awaiter(this, void 0, void 0, function* () {
            const groupPurpose = yield this.handleGroupPurpose(purpose, others);
            let url = null;
            if (groupIcon) {
                url = yield this.UploadPhoto(groupIcon);
            }
            groupData.groupIcon = url;
            groupData.purposeId = groupPurpose._id;
            groupData.purposeText = groupPurpose.text;
            groupData.createdBy = userId;
            groupData.members = [userId];
            groupData.groupCode = yield this.generateGroupId();
            let group = yield new GroupModel_1.default(groupData).save();
            yield this.handleGroupMember(userId, group._id, group.groupCode);
            return group;
        });
    }
    /**
     *
     * @param userId
     * @param groupId
     * @returns data of type GroupMemberInterface;
     */
    handleGroupMember(userId, groupId, groupCode) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = {
                group: groupId,
                member: userId,
                isAdmin: true,
                groupCode: groupCode,
                groupRequestStatus: GroupMemberInterface_1.GroupRequestStatus.noRequest
            };
            let user = yield UserModel_1.default.findByIdAndUpdate(userId, { $push: { groups: groupId } }, { new: true });
            if (!user)
                return { isUser: false };
            const group = yield GroupMemberModel_1.default.create(data);
            return { group };
        });
    }
    /**
     * @void
     * @returns code:string
     */
    generateGroupId() {
        return __awaiter(this, void 0, void 0, function* () {
            let code = new Auth_1.Auth().generateVerificationCode(7);
            code = `GT${code}`;
            const isExist = yield GroupModel_1.default.exists({ groupCode: code });
            if (isExist) {
                code = yield this.generateGroupId();
            }
            return code;
        });
    }
    /**
     *
     * @param groupId
     * @returns Promise<any>
     */
    groupDetails(groupId, userId) {
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
                        'isJoined': {
                            '$in': [
                                userId, '$members'
                            ]
                        },
                        'isAdmin': {
                            '$eq': [
                                userId, '$createdBy._id'
                            ]
                        },
                        'createdBy': {
                            '_id': 1,
                            'avatar': 1,
                            'displayName': 1,
                            'customerCode': 1
                        },
                        'purpose': {
                            '_id': 1,
                            'text': 1
                        }
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
    /**
     *
     * @param groupId
     * @param groupData
     * @param groupIcon
     * @returns {Promise<GroupInterface>}
     */
    editGroup(groupId, groupData, groupIcon = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, goalInterval, goalPrice, description, showContactInfo, showSocialInfo, phoneNumber, email, address, facebookUrl, twitterUrl, city, state, zipCode } = groupData;
            let group = yield GroupModel_1.default.findById(groupId);
            group.name = name || group.name;
            group.goalInterval = goalInterval || group.goalInterval;
            group.goalPrice = goalPrice || group.goalPrice;
            group.description = description || group.description;
            group.showContactInfo = showContactInfo || group.showContactInfo;
            group.showSocialInfo = showSocialInfo || group.showSocialInfo;
            group.phoneNumber = phoneNumber || group.phoneNumber;
            group.email = email || group.email;
            group.address = address || group.address;
            group.twitterUrl = twitterUrl || group.twitterUrl;
            group.facebookUrl = facebookUrl || group.facebookUrl;
            group.city = city || group.city;
            group.state = state || group.state;
            group.zipCode = zipCode || group.zipCode;
            if (groupIcon && typeof groupIcon !== 'string') {
                group.groupIcon = yield this.UploadPhoto(groupIcon);
            }
            yield group.save();
            return group;
        });
    }
    /**
     *
     * @param groupId
     * @param skip
     * @param limit
     * @param search
     * @returns {Promise<any>} list of group members.
     */
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
                        'member': {
                            '_id': 1,
                            'email': 1,
                            'customerCode': 1,
                            'firstName': 1,
                            'lastName': 1,
                            'name': 1,
                            'displayName': 1,
                            'avatar': 1
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
    /**
     *
     * @param {string} groupId
     * @param {string} memberId
     * @returns {Promise}
     */
    removeMember(groupId, memberId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let group = yield GroupModel_1.default.findById(groupId);
            if (!group)
                return { groupNotExist: true };
            if (JSON.stringify(group.createdBy) !== JSON.stringify(userId))
                return { notAdmin: true };
            const groupMember = yield this.handleGroupMemberRemove(groupId, memberId);
            if (!groupMember)
                return { notGroupMember: true };
            group = yield this.handleUserRemove(group, memberId);
            return { group };
        });
    }
    /**
     *
     * @param group
     * @param userId
     * @returns Promise<GroupInterface>
     */
    handleUserRemove(group, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            group.members = group.members.filter((e) => JSON.stringify(userId) !== JSON.stringify(e));
            group.totalMembers -= 1;
            yield group.save();
            const user = yield UserModel_1.default.findById(userId);
            user.groups = user.groups.filter((e) => JSON.stringify(e) !== JSON.stringify(group._id));
            yield user.save();
            return group;
        });
    }
    /**
     *
     * @param groupId
     * @param memberId
     * @returns Promise<boolean>
     */
    handleGroupMemberRemove(groupId, memberId, isLeft = false) {
        return __awaiter(this, void 0, void 0, function* () {
            let groupMember = yield GroupMemberModel_1.default.findOne({
                group: groupId,
                member: memberId,
                isDeleted: false
            });
            if (!groupMember)
                return false;
            if (isLeft) {
                if (groupMember.isLeft)
                    return false;
                groupMember.isLeft = true;
                groupMember.leftTime = new Date();
            }
            else {
                if (groupMember.isRemoved)
                    return false;
                groupMember.isRemoved = true;
                groupMember.removeTime = new Date();
            }
            yield groupMember.save();
            const subgroups = yield SubgroupModel_1.default.find({ groupId, isDeleted: false });
            for (let subgroup of subgroups) {
                yield SubgroupService_1.default.handleSubgroupMemberRemove(subgroup._id, memberId);
            }
            return true;
        });
    }
    searchGroup(queryString, uId) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = uId;
            const userId = new mongoose_1.Types.ObjectId(id);
            const search = queryString.search;
            const page = Number(queryString.page) * 1 || 1;
            const limit = Number(queryString.limit) * 1 || 10;
            const skip = (page - 1) * limit;
            let searchKey = 'name';
            let searchValue = '';
            if (search) {
                [searchKey, searchValue] = search.split(',');
            }
            const match = {
                isDeleted: false
            };
            if (searchKey && searchValue)
                match[searchKey] = { '$regex': searchValue, '$options': '$i' };
            const favCheck = [
                {
                    '$lookup': {
                        'from': 'groupfavorites',
                        'let': {
                            'gid': '$_id'
                        },
                        'as': 'fav',
                        'pipeline': [
                            {
                                '$match': {
                                    'userId': userId,
                                    '$expr': {
                                        '$eq': [
                                            '$$gid', '$groupId'
                                        ]
                                    }
                                }
                            },
                            {
                                '$limit': 1
                            }
                        ]
                    }
                },
            ];
            const project = {
                '$project': {
                    '_id': 1,
                    'name': 1,
                    'groupCode': 1,
                    'groupIcon': 1,
                    'purposeText': 1,
                    'phoneNumber': 1,
                    'email': 1,
                    'city': 1,
                    'state': 1,
                    'showContactInfo': 1,
                    'showSocialInfo': 1,
                    'facebookUrl': 1,
                    'twitterUrl': 1,
                    'zipCode': 1,
                    'address': 1,
                    'description': 1,
                    'totalMembers': 1,
                    'isFavorite': {
                        '$cond': [
                            '$fav',
                            {
                                '$gt': [
                                    {
                                        '$size': '$fav'
                                    }, 0
                                ]
                            },
                            false
                        ]
                    },
                    'isJoined': {
                        '$in': [
                            userId, '$members'
                        ]
                    },
                    'createdBy': {
                        '_id': 1,
                        'avatar': 1,
                        'customerCode': 1,
                        'customerId': 1,
                        'email': 1,
                        'name': 1,
                        'displayName': 1
                    }
                }
            };
            const facet = {
                '$facet': {
                    'count': [
                        {
                            '$count': 'count'
                        }
                    ],
                    'groups': [
                        {
                            '$skip': skip
                        },
                        {
                            '$limit': limit
                        },
                        {
                            '$lookup': {
                                'from': 'users',
                                'localField': 'createdBy',
                                'foreignField': '_id',
                                'as': 'createdBy'
                            }
                        },
                        {
                            '$unwind': {
                                'path': '$createdBy',
                                'preserveNullAndEmptyArrays': true
                            }
                        },
                    ]
                }
            };
            const pipeline = [
                {
                    '$match': match
                },
                facet
            ];
            if (userId)
                facet.$facet.groups.push(...favCheck);
            facet.$facet.groups.push(project);
            console.log();
            const groupData = yield GroupModel_1.default.aggregate(pipeline);
            let count = 0;
            let list = [];
            if (groupData.length) {
                if (groupData[0].count.length) {
                    count = groupData[0].count[0].count;
                }
                ;
                list = groupData[0].groups;
            }
            return { count, list };
        });
    }
    /**
     *
     * @param userId
     * @param skip
     * @param limit
     * @param search
     * @returns {Promise<{count: number; list:any}>}
     */
    allGroupList(userId, skip, limit, search = '') {
        return __awaiter(this, void 0, void 0, function* () {
            let match = {
                isDeleted: false
            };
            if (search && search.trim) {
                match = {
                    'isDeleted': false,
                    'name': {
                        '$regex': search,
                        '$options': '$i'
                    }
                };
            }
            const pipeline = [
                {
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
                                    'from': 'groupfavorites',
                                    'let': {
                                        'gid': '$_id'
                                    },
                                    'as': 'fav',
                                    'pipeline': [
                                        {
                                            '$match': {
                                                'userId': userId,
                                                '$expr': {
                                                    '$eq': [
                                                        '$$gid', '$groupId'
                                                    ]
                                                }
                                            }
                                        },
                                        {
                                            '$limit': 1
                                        }
                                    ]
                                }
                            },
                            {
                                '$project': {
                                    'name': 1,
                                    'groupIcon': 1,
                                    'email': 1,
                                    'groupCode': 1,
                                    'totalSubgroup': 1,
                                    'phoneNumber': 1,
                                    'address': 1,
                                    'createdBy': {
                                        '_id': 1,
                                        'name': 1,
                                        'email': 1,
                                        'avatar': 1,
                                    },
                                    'isJoined': {
                                        '$cond': [
                                            {
                                                '$in': [
                                                    userId, '$members'
                                                ]
                                            }, true, false
                                        ]
                                    },
                                    'isFavorite': {
                                        '$gt': [
                                            {
                                                '$size': '$fav'
                                            }, 0
                                        ]
                                    },
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
                        list: 1
                    }
                }
            ];
            const groupData = yield GroupModel_1.default.aggregate(pipeline);
            let count = 0;
            let list = [];
            if (groupData.length) {
                count = groupData[0].count;
                list = groupData[0].list;
            }
            return { count, list };
        });
    }
    userLeftGroup(userId, groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            let group = yield GroupModel_1.default.findById(groupId);
            console.log('group', group);
            if (!group)
                return { groupNotExist: true };
            if (JSON.stringify(group.createdBy) === JSON.stringify(userId)) {
                return { isAdmin: true };
            }
            const groupMember = yield this.handleGroupMemberRemove(groupId, userId, true);
            if (!groupMember)
                return { notGroupMember: true };
            group = yield this.handleUserRemove(group, userId);
            return { group };
        });
    }
    joinGroup(groupId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            let group = yield GroupModel_1.default.findById(groupId);
            if (!group)
                return { groupNotExist: true };
            const member = yield this.handleGroupMemberJoin(group, user);
            if (!member)
                return { alreadyMember: true };
            return { group };
        });
    }
    handleGroupMemberJoin(group, user) {
        return __awaiter(this, void 0, void 0, function* () {
            let member = yield GroupMemberModel_1.default.findOne({ group: group._id, member: user._id });
            if (member) {
                if (!member.isLeft && !member.isRemoved)
                    return false;
            }
            else {
                member = yield GroupMemberModel_1.default.create({
                    group: group._id,
                    member: user._id,
                    groupRequestStatus: GroupMemberInterface_1.GroupRequestStatus.noRequest,
                    groupCode: group.groupCode
                });
            }
            member.isRemoved = false;
            member.removeTime = null;
            return yield GroupRequestService_1.default.handleRequestAccept(member, group, user, true);
        });
    }
}
exports.default = new GroupService();
