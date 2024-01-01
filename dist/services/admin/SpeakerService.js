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
const SpeakerModel_1 = require("../../models/SpeakerModel");
const ContactUsModel_1 = require("../../models/ContactUsModel");
const fs = require('fs');
class SpeakerService {
    createSpeaker(req, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // let sourceImageFilePath ; // Replace with the path to your source image file
                let outputPath; // Specify the desired destination path
                if (req.files.logo) {
                    outputPath = `images/companyLogo/${Date.now()}.jpg`;
                    fs.copyFile((_a = req.files.logo) === null || _a === void 0 ? void 0 : _a.filepath, outputPath, (err) => {
                        if (err) {
                            console.error(`Error copying the image: ${err}`);
                        }
                        else {
                            console.log(`Image saved to ${outputPath}`);
                        }
                    });
                }
                const newSpeaker = new SpeakerModel_1.default({
                    title: req.body.title,
                    companyName: req.body.companyName,
                    name: req.body.name,
                    isActive: 0,
                    profilePic: outputPath,
                });
                yield newSpeaker.save();
                return {
                    newSpeaker,
                    message: 'Speaker created successfully'
                };
            }
            catch (error) {
                console.error('Error creating speaker:', error);
                next(error);
            }
        });
    }
    editSpeaker(req, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // let sourceImageFilePath ; // Replace with the path to your source image file
                let outputPath = null; // Specify the desired destination path
                if (req.files.logo) {
                    outputPath = `images/companyLogo/${Date.now()}.jpg`;
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
                    payload.profilePic = outputPath;
                }
                let speaker = yield SpeakerModel_1.default.findByIdAndUpdate({ _id: payload._id }, payload);
                return {
                    speaker,
                    message: 'Speaker created successfully'
                };
            }
            catch (error) {
                console.error('Error creating speaker:', error);
                next(error);
            }
        });
    }
    updateStatus(speakerId) {
        return __awaiter(this, void 0, void 0, function* () {
            let speaker = yield SpeakerModel_1.default.findOne({ _id: speakerId });
            speaker.isActive = !speaker.isActive;
            yield speaker.save();
            return;
        });
    }
    getAllSpeakers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const speakers = yield SpeakerModel_1.default.find().sort({ createdAt: -1 }).exec();
                return speakers;
            }
            catch (error) {
                console.error('Error fetching speakers:', error);
                throw error;
            }
        });
    }
    ;
    getContactList() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const speakers = yield ContactUsModel_1.default.find().sort({ createdAt: -1 }).exec();
                return speakers;
            }
            catch (error) {
                console.error('Error fetching speakers:', error);
                throw error;
            }
        });
    }
    ;
}
const speakerService = new SpeakerService(); // Create an instance of SpeakerService
exports.default = speakerService;
// export default new SpeakerService();
