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
const SpeakerService_1 = require("../../services/admin/SpeakerService");
const ResponseHelper_1 = require("../../helpers/ResponseHelper");
class SpeakerController {
    createSpeaker(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield SpeakerService_1.default.createSpeaker(req, next);
                if (data) {
                    res.logMsg = 'Speaker profile added successfully';
                    return ResponseHelper_1.default.responseHandler(res, 200, 'SPEAKER ADDED', res.__('Speaker Profile Added'), data);
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
    getAllSpeakers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const speakerData = yield SpeakerService_1.default.getAllSpeakers();
                if (speakerData) {
                    res.logMsg = 'Speaker fetched successfully';
                    return ResponseHelper_1.default.responseHandler(res, 201, 'SPEAKER ADDED', res.__('All Speakers'), speakerData);
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
                const data = yield SpeakerService_1.default.editSpeaker(req, next);
                if (data) {
                    res.logMsg = 'Speaker profile added successfully';
                    return ResponseHelper_1.default.responseHandler(res, 200, 'SPEAKER ADDED', res.__('Speaker Profile Added'), data);
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
                let speakerId = req.params.id;
                yield SpeakerService_1.default.updateStatus(speakerId);
                return ResponseHelper_1.default.responseHandler(res, 200, 'SPEAKER status updated successfully', res.__('Speaker updated'), {});
            }
            catch (error) {
                next(error);
            }
        });
    }
    ;
    getContactList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const speakerData = yield SpeakerService_1.default.getContactList();
                return ResponseHelper_1.default.responseHandler(res, 201, 'Contaclt successfully', 'All Contacts fetched successfully', speakerData);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new SpeakerController();
