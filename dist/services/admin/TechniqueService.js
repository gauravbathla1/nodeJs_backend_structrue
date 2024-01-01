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
const TechniqueModel_1 = require("../../models/TechniqueModel");
class SituationService {
    createTechnique(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            let technique = new TechniqueModel_1.default(payload);
            yield technique.save();
            return technique;
        });
    }
    editTechnique(techniqueId, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            let technique = yield TechniqueModel_1.default.findByIdAndUpdate({ _id: techniqueId }, payload, { new: true });
            return technique;
        });
    }
    deleteTechnique(techniqueId) {
        return __awaiter(this, void 0, void 0, function* () {
            let technique = TechniqueModel_1.default.findByIdAndUpdate({ _id: techniqueId }, { isDeleted: true }, { new: true });
            return technique;
        });
    }
    getTechniques(options) {
        return __awaiter(this, void 0, void 0, function* () {
            let myAggregate = TechniqueModel_1.default.aggregate([{
                    $match: {
                        isDeleted: false
                    }
                }]);
            let techniques = TechniqueModel_1.default.aggregatePaginate(myAggregate, options);
            return techniques;
        });
    }
}
const situationAdminService = new SituationService(); // Create an instance of categoryService
exports.default = situationAdminService;
