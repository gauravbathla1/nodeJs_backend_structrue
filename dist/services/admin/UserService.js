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
const UserModel_1 = require("../../models/UserModel");
const mostViewdModel_1 = require("../../models/mostViewdModel");
const SearchModel_1 = require("../../models/SearchModel");
class UserService {
    /**
   * @description listing of user
   * @param queryString req query object
   * @params User id of user
   * @returns
   */
    getDashBoardData() {
        return __awaiter(this, void 0, void 0, function* () {
            let totaUsers = yield UserModel_1.default.countDocuments();
            var currentDate = new Date(); // Get the current date
            // Calculate the date 30 days ago
            currentDate.setDate(currentDate.getDate() - 30);
            let activeUsers = yield UserModel_1.default.countDocuments({ lastLogin: { $gte: currentDate } });
            let views = yield UserService.getTopViews();
            let searches = yield SearchModel_1.default.aggregate([
                {
                    $group: {
                        _id: "$searchText",
                        count: { $sum: 1 }
                    }
                },
                {
                    $sort: { count: -1 }
                },
                {
                    $limit: 20
                }
            ]);
            return { totaUsers, activeUsers, views, searches };
        });
    }
    static getTopViews() {
        return __awaiter(this, void 0, void 0, function* () {
            let views = yield mostViewdModel_1.default.aggregate([
                {
                    '$addFields': {
                        'totalView': {
                            '$size': '$viewBy'
                        }
                    }
                }, {
                    '$sort': {
                        'totalView': -1,
                        'createdAt': -1
                    }
                }, {
                    '$limit': 20
                }, {
                    '$lookup': {
                        'from': 'situations',
                        'localField': 'situation',
                        'foreignField': '_id',
                        'as': 'situation'
                    }
                }, {
                    '$unwind': {
                        'path': '$situation',
                        'preserveNullAndEmptyArrays': true
                    }
                }, {
                    '$lookup': {
                        'from': 'techniques',
                        'localField': 'technique',
                        'foreignField': '_id',
                        'as': 'technique'
                    }
                }, {
                    '$unwind': {
                        'path': '$technique',
                        'preserveNullAndEmptyArrays': true
                    }
                }, {
                    '$project': {
                        'name': {
                            '$ifNull': [
                                '$technique.techniqueName', '$situation.situationName'
                            ]
                        },
                        'totalView': 1,
                        'techniqueId': {
                            '$cond': {
                                'if': '$technique.techniqueName',
                                'then': '$technique._id',
                                'else': null
                            }
                        },
                        'situationId': {
                            '$cond': {
                                'if': '$situation._id',
                                'then': '$situation._id',
                                'else': null
                            }
                        }
                    }
                }
            ]);
            return views;
        });
    }
    getUserList(options) {
        return __awaiter(this, void 0, void 0, function* () {
            let myAggregate = UserModel_1.default.aggregate([{
                    $match: {
                        email: {
                            $ne: null
                        }
                    }
                }]);
            let users = yield UserModel_1.default.aggregatePaginate(myAggregate, options);
            return users;
        });
    }
    updateUserStatus(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield UserModel_1.default.findOne({ _id: id });
            user.isAccountActive = !user.isAccountActive;
            yield user.save();
            return user;
        });
    }
    /**
  * @description get user by id
  * @param id {String} user id for fetching user
  * @returns {Promise<UserInterface>} user data by id
  */
    findUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = yield UserModel_1.default.findById(id);
            return userData;
        });
    }
}
exports.default = new UserService();
