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
const TechniqueService_1 = require("../../services/admin/TechniqueService");
class TechniqueContoller {
    createTechnique(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let payload = req.body;
                yield TechniqueService_1.default.createTechnique(payload);
                return ResponseHelper_1.default.created(res, "Technique Added successfully", {});
            }
            catch (error) {
                next(error);
            }
        });
    }
    editTechnique(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let techniqueId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
                let payload = req.body;
                yield TechniqueService_1.default.editTechnique(techniqueId, payload);
                return ResponseHelper_1.default.ok(res, "Technique Updated successfully", {});
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteTechnique(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let techniqueId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
                const quote = yield TechniqueService_1.default.deleteTechnique(techniqueId);
                return ResponseHelper_1.default.ok(res, "Technique Deleted successfully", { quote });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getTechnique(req, res, next) {
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
                let quotes = yield TechniqueService_1.default.getTechniques(options);
                return ResponseHelper_1.default.ok(res, "Techniques find successfully", { quotes });
            }
            catch (error) {
                next;
            }
        });
    }
}
exports.default = new TechniqueContoller();
