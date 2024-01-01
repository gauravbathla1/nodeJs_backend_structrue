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
const LogoService_1 = require("../../services/admin/LogoService");
const LogoService_2 = require("../../services/admin/LogoService");
class LogoController {
    createLogo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield LogoService_1.default.createLogo(req, next);
                if (data) {
                    res.logMsg = 'Logo added successfully';
                    return ResponseHelper_1.default.responseHandler(res, 200, 'Logo ADDED', res.__('Logo Added'), data);
                }
                else {
                    return ResponseHelper_1.default.serverError(res, res.__('error'));
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAllLogo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let type = req.query.type || 'main';
                const logoData = yield LogoService_1.default.getAllLogo(type);
                if (logoData) {
                    res.logMsg = 'logo fetched successfully';
                    return ResponseHelper_1.default.responseHandler(res, 201, 'logo ADDED', res.__('All Speakers'), logoData);
                }
                else {
                    return ResponseHelper_1.default.serverError(res, res.__('error'));
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    edit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield LogoService_2.default.editLogo(req, next);
                if (data) {
                    res.logMsg = 'Logo updated successfully';
                    return ResponseHelper_1.default.responseHandler(res, 200, 'Logo updated', res.__('Logo Updated'), data);
                }
                else {
                    return ResponseHelper_1.default.serverError(res, res.__('error'));
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    ;
    updateStatus(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let logoId = req.params.id;
                yield LogoService_1.default.updateStatus(logoId);
                return ResponseHelper_1.default.responseHandler(res, 200, 'Logo status updated successfully', res.__('Logo updated'), {});
            }
            catch (error) {
                next(error);
            }
        });
    }
    ;
    updateLogoBannerStatus(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let logoId = req.params.id;
                yield LogoService_1.default.updateLogoBannerStatus(logoId);
                return ResponseHelper_1.default.responseHandler(res, 200, 'Logo status updated successfully', res.__('Logo updated'), {});
            }
            catch (error) {
                next(error);
            }
        });
    }
    ;
}
exports.default = new LogoController();
