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
const ReportReasonModel_1 = require("../../models/ReportReasonModel");
const ApiFeatures_1 = require("../../utils/ApiFeatures");
class ReportReasonService {
    /**
     *
     * @param title {string} title of reportreason
     * @param text {string} text of reportreason
     * @returns reportreason {Promise<ReportReasonInterface>} new added reportreason
     */
    add(categoryId, title, text) {
        return __awaiter(this, void 0, void 0, function* () {
            const newReportReason = yield ReportReasonModel_1.default.create({ categoryId, title, text });
            return newReportReason;
        });
    }
    /**
    *
    * @param _id id of reportreason
    * @param title title of reportreason
    * @param text text of reportreason
    * @returns  {Promise<ReportInterface>}
    */
    update(_id, title, text) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedreportreason = yield ReportReasonModel_1.default.findByIdAndUpdate(_id, {
                title,
                text,
            }, {
                new: true
            });
            return updatedreportreason;
        });
    }
    /**
   * @description listing of reportreason
   * @param queryString req query object
   * @returns
   */
    list(queryString) {
        return __awaiter(this, void 0, void 0, function* () {
            const countQuery = ReportReasonModel_1.default.find({ isDeleted: false });
            const countFeature = new ApiFeatures_1.ApiFeatures(countQuery, queryString)
                .searching(['text'])
                .getCount();
            const lisQuery = ReportReasonModel_1.default.find({ isDeleted: false });
            const listFeature = new ApiFeatures_1.ApiFeatures(lisQuery, queryString)
                .searching(['text'])
                .sorting('-createdAt')
                .pagination();
            const count = yield countFeature.query.populate('');
            const list = yield listFeature.query;
            return { list, count };
        });
    }
}
exports.default = new ReportReasonService();
