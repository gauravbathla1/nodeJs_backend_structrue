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
const ResponseHelper_1 = require("../../helpers/ResponseHelper");
const SituationService_1 = require("../../services/admin/SituationService");
class SituationContoller {
    createSituation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let payload = req.body;
                yield SituationService_1.default.createSituation(payload);
                return ResponseHelper_1.default.created(res, "Situation Added successfully", {});
            }
            catch (error) {
                next(error);
            }
        });
    }
    editSituation(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let situtionId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
                let payload = req.body;
                yield SituationService_1.default.editSituation(situtionId, payload);
                return ResponseHelper_1.default.ok(res, "Situation Updated successfully", {});
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteSituation(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let situtionId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
                const quote = yield SituationService_1.default.deleteSituation(situtionId);
                return ResponseHelper_1.default.ok(res, "Situation Deleted successfully", { quote });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getSituation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let page = req.query.page || 1;
                let options = {
                    page: page || 1,
                    limit: 10,
                    sort: {
                        createdAt: 1,
                    },
                };
                let situations = yield SituationService_1.default.getSituations(options);
                return ResponseHelper_1.default.ok(res, "Situation find successfully", { situations });
            }
            catch (error) {
                next;
            }
        });
    }
    ;
    uploadImage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let files = req === null || req === void 0 ? void 0 : req.files;
                let path = yield SituationService_1.default.uploadImage(files);
                return res.status(200).json({ image: path });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new SituationContoller();
