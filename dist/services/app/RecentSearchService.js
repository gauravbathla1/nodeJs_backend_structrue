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
const RecentSearchModel_1 = require("../../models/RecentSearchModel");
class RecentSearchService {
    /**
 
    * @param userId
    * @param searchText
    * @returns new added recentsearch
    */
    add(userId, searchText) {
        return __awaiter(this, void 0, void 0, function* () {
            const newRecentSearch = yield RecentSearchModel_1.default.create({ userId, searchText });
            return newRecentSearch;
        });
    }
    /**
         *
         * @param id {String} recentsearch id for deleting recentsearch
         * @returns {Promise<RecentSearchInterface>} deleted recentsearch
         */
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteRecentSearch = yield RecentSearchModel_1.default.findByIdAndDelete(id);
            return deleteRecentSearch;
        });
    }
}
exports.default = new RecentSearchService();
