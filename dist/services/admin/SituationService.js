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
const SituationModel_1 = require("../../models/SituationModel");
const FileUpload_1 = require("../../utils/FileUpload");
class SituationService {
    createSituation(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            let situation = new SituationModel_1.default(payload);
            yield situation.save();
            return situation;
        });
    }
    editSituation(situationId, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            let situation = yield SituationModel_1.default.findByIdAndUpdate({ _id: situationId }, payload, { new: true });
            return situation;
        });
    }
    deleteSituation(situationId) {
        return __awaiter(this, void 0, void 0, function* () {
            let situation = yield SituationModel_1.default.findByIdAndUpdate({ _id: situationId }, { isDeleted: true }, { new: true });
            return situation;
        });
    }
    getSituations(options) {
        return __awaiter(this, void 0, void 0, function* () {
            let myAggregate = SituationModel_1.default.aggregate([{
                    $match: {
                        isDeleted: false
                    }
                }]);
            let situations = yield SituationModel_1.default.aggregatePaginate(myAggregate, options);
            return situations;
        });
    }
    ;
    uploadImage(files) {
        return __awaiter(this, void 0, void 0, function* () {
            if (files.image) {
                let path = yield FileUpload_1.default.uploadFileOnS3(files.image, 'images', Date.now().toString());
                return path;
            }
            else if (files.animation) {
                let path = yield FileUpload_1.default.uploadFileOnS3(files.animation, 'animations', Date.now().toString());
                return path;
            }
        });
    }
}
const situationAdminService = new SituationService(); // Create an instance of categoryService
exports.default = situationAdminService;
