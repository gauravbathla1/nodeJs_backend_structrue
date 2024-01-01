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
exports.getList = void 0;
const LogModel_1 = require("./LogModel");
const getList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqQuery = req.query;
        const limit = reqQuery.limit || 50;
        const match = {};
        if (reqQuery.lt) {
            match['createdAt'] = { '$lte': new Date(reqQuery.lt) };
        }
        if (reqQuery.gt) {
            match['createdAt'] = { '$gte': new Date(reqQuery.gt) };
        }
        if (reqQuery.execStatus) {
            match['execStatus'] = Number(reqQuery.execStatus);
        }
        if (reqQuery.search) {
            match['api'] = { '$regex': reqQuery.search, '$options': '$i' };
        }
        const countMatch = Object.assign({}, match);
        delete countMatch.createdAt;
        const count = yield LogModel_1.default.countDocuments(countMatch);
        const list = yield LogModel_1.default.find(match).sort({ createdAt: -1 }).limit(limit);
        res.status(200).json({
            status: 200,
            data: {
                count,
                list
            }
        });
    }
    catch (error) {
        console.log('error', error);
    }
});
exports.getList = getList;
