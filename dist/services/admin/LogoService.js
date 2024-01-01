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
const LogoModel_1 = require("../../models/LogoModel");
const fs = require('fs');
class LogoService {
    createLogo(req, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let outputPath;
                if (req.files.logo) {
                    outputPath = `images/logo/${Date.now()}.jpg`;
                    fs.copyFile((_a = req.files.logo) === null || _a === void 0 ? void 0 : _a.filepath, outputPath, (err) => {
                        if (err) {
                            console.error(`Error copying the image: ${err}`);
                        }
                        else {
                            console.log(`Image saved to ${outputPath}`);
                        }
                    });
                }
                const newLogo = new LogoModel_1.default({
                    name: req.body.name,
                    sponserType: req.body.sponserType,
                    email: req.body.email,
                    logo: outputPath,
                });
                yield newLogo.save();
                return {
                    newLogo,
                    message: 'Logo created successfully'
                };
            }
            catch (error) {
                console.error('Error creating speaker:', error);
                next(error);
            }
        });
    }
    editLogo(req, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let outputPath = null;
                if (req.files.logo) {
                    outputPath = `images/logo/${Date.now()}.jpg`;
                    fs.copyFile((_a = req.files.logo) === null || _a === void 0 ? void 0 : _a.filepath, outputPath, (err) => {
                        if (err) {
                            console.error(`Error copying the image: ${err}`);
                        }
                        else {
                            console.log(`Image saved to ${outputPath}`);
                        }
                    });
                }
                ;
                let payload = req === null || req === void 0 ? void 0 : req.body;
                if (outputPath) {
                    payload.logo = outputPath;
                }
                let speaker = yield LogoModel_1.default.findByIdAndUpdate({ _id: payload._id }, payload);
                return {
                    speaker,
                    message: 'Logo updated successfully'
                };
            }
            catch (error) {
                console.error('Error creating speaker:', error);
                next(error);
            }
        });
    }
    updateStatus(logoId) {
        return __awaiter(this, void 0, void 0, function* () {
            let logo = yield LogoModel_1.default.findOne({ _id: logoId });
            logo.isActive = !logo.isActive;
            yield logo.save();
            return;
        });
    }
    updateLogoBannerStatus(logoId) {
        return __awaiter(this, void 0, void 0, function* () {
            let logo = yield LogoModel_1.default.findOne({ _id: logoId });
            logo.isBannerActive = !logo.isBannerActive;
            yield logo.save();
            return;
        });
    }
    getAllLogo(type) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const logo = yield LogoModel_1.default.find({ sponserType: type }).sort({ createdAt: -1 }).exec();
                return logo;
            }
            catch (error) {
                console.error('Error fetching logo:', error);
                throw error;
            }
        });
    }
    ;
}
const logoService = new LogoService(); // Create an instance of LogoService
exports.default = logoService;
// export default new SpeakerService();
