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
const GroupMemberModel_1 = require("../../models/GroupMemberModel");
const GroupMemberInterface_1 = require("../../interfaces/GroupMemberInterface");
const UserModel_1 = require("../../models/UserModel");
class GroupRequestService {
    /**
     *
     * @param userId requested user id
     * @param sendBy request sender id
     * @param groupId groupId
     * @param groupCode unique group code
     * @returns GroupRequest, isRequestExists, isMemberExists
     */
    createRequest(userId, groupId, groupCode, requestSentBy) {
        return __awaiter(this, void 0, void 0, function* () {
            const member = yield GroupMemberModel_1.default.findOne({
                group: groupId,
                member: userId
            });
            if (member) {
                if (member.groupRequestStatus === GroupMemberInterface_1.GroupRequestStatus.pending)
                    return { isRequestExist: true };
                if (!member.isLeft && !member.isRemoved)
                    return { isMemberExist: true };
                member.isLeft = false;
                member.isRemoved = false;
                member.removeTime = null;
                member.leftTime = null;
                member.groupRequestStatus = GroupMemberInterface_1.GroupRequestStatus.pending;
                member.requestSentBy = requestSentBy;
                yield member.save();
                yield UserModel_1.default.findByIdAndUpdate(userId, { $push: { groups: groupId } }, { new: true });
                return {
                    groupRequest: member
                };
            }
            else {
                yield UserModel_1.default.findByIdAndUpdate(userId, { $push: { groups: groupId } }, { new: true });
                return {
                    groupRequest: yield GroupMemberModel_1.default.create({
                        group: groupId,
                        member: userId,
                        groupCode,
                        requestSentBy
                    })
                };
            }
        });
    }
    /**
     *
     * @param group group object
     * @param user user object
     * @param isAccept true or false
     * @returns {Promise<requestNotExists?: boolean,isRequestAccepted?: boolean,isRequestRejected?: boolean>}
     */
    groupRequest(group, user, isAccept) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield GroupMemberModel_1.default.findOne({
                group: group._id,
                member: user._id,
            });
            if (!request)
                return { requestNotExists: true };
            if (request.groupRequestStatus !== GroupMemberInterface_1.GroupRequestStatus.pending)
                return { requestNotExists: true };
            if (isAccept)
                return { isRequestAccepted: yield this.handleRequestAccept(request, group, user) };
            return { isRequestRejected: yield this.handleRequestReject(request, user) };
        });
    }
    /**
     *
     * @param request group request object
     * @param group group object
     * @param user user object
     * @returns {Promise<true>}
     */
    handleRequestAccept(request, group, user, isNotRequest = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!isNotRequest) {
                request.groupRequestStatus = GroupMemberInterface_1.GroupRequestStatus.accepted;
            }
            request.isLeft = false;
            yield request.save();
            const userId = user._id;
            group.members.push(userId);
            group.totalMembers = group.totalMembers + 1;
            yield group.save();
            if (!user.groups.some((e) => JSON.stringify(e) !== JSON.stringify(group._id)))
                user.groups.push(group._id);
            yield user.save();
            return true;
        });
    }
    /**
     *
     * @param request group request object
     * @returns {Promise<true>}
     */
    handleRequestReject(request, user) {
        return __awaiter(this, void 0, void 0, function* () {
            user.groups = user.groups.filter((groupId) => JSON.stringify(groupId) !== JSON.stringify(request.group));
            yield user.save();
            yield request.delete();
            return true;
        });
    }
    groupRequestList(currentUserId, queryString) {
        return __awaiter(this, void 0, void 0, function* () {
            const limit = Number(queryString.limit) || 10;
            const page = Number(queryString.page) || 1;
            const skip = (page - 1) * limit;
            const pipeline = [
                {
                    '$match': {
                        'groupRequestStatus': 1,
                        'member': currentUserId
                    }
                },
                {
                    '$lookup': {
                        'from': 'groups',
                        'localField': 'group',
                        'foreignField': '_id',
                        'as': 'group'
                    }
                },
                {
                    '$unwind': {
                        'path': '$group',
                        'preserveNullAndEmptyArrays': true
                    }
                },
            ];
            const facet = {
                '$facet': {
                    'count': [
                        {
                            '$count': 'count'
                        }
                    ],
                    'requests': [
                        {
                            '$sort': {
                                'updatedAt': -1
                            }
                        },
                        {
                            '$skip': skip
                        },
                        {
                            '$limit': limit
                        },
                        {
                            '$lookup': {
                                'from': 'users',
                                'localField': 'requestSentBy',
                                'foreignField': '_id',
                                'as': 'sentBy'
                            }
                        },
                        {
                            '$unwind': {
                                'path': '$sentBy',
                                'preserveNullAndEmptyArrays': true
                            }
                        },
                        {
                            '$project': {
                                '_id': 1,
                                'sentBy': {
                                    '_id': 1,
                                    'name': 1,
                                    'customerId': 1,
                                    'avatar': 1,
                                    'email': 1,
                                },
                                'group': {
                                    '_id': 1,
                                    'groupCode': 1,
                                    'name': 1,
                                    'groupIcon': 1,
                                    'purposeText': 1
                                },
                                'createdAt': 1,
                                'updatedAt': 1,
                                'groupRequestStatus': 1,
                                'requestSentBy': 1
                            }
                        }
                    ]
                }
            };
            const search = queryString.search;
            if (search && search.trim()) {
                pipeline.push({
                    '$match': {
                        'group.name': { '$regex': search, '$options': '$i' }
                    }
                });
            }
            pipeline.push(facet);
            const requestData = yield GroupMemberModel_1.default.aggregate(pipeline);
            let count = 0;
            let list = [];
            if (requestData.length) {
                if (requestData[0].count.length)
                    count = requestData[0].count[0].count;
                list = requestData[0].requests;
            }
            return { count, list };
        });
    }
}
exports.default = new GroupRequestService();
