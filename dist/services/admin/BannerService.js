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
const S3Constant_1 = require("../../constants/S3Constant");
const BannerModel_1 = require("../../models/BannerModel");
const ApiFeatures_1 = require("../../utils/ApiFeatures");
const FileUpload_1 = require("../../utils/FileUpload");
class BannerService {
    /**
     *
     * @param photo {string} photo of banner
     * @param clickUrl {string} absolute path of banner clickUrl
     * @returns banner {Promise<BannerInterface>} new added banner
     */
    add(photo, clickUrl, deviceType) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = yield this.uploadPhoto(photo, S3Constant_1.S3_DIRECTORY.banner);
            const newBanner = yield BannerModel_1.default.create({ photo: url, clickUrl, deviceType });
            return newBanner;
        });
    }
    /**
     *
     * @param photo {File} photo to be uploaded
     * @param directory {String} photo directory
     * @returns {Promise<{url: string}>} uploaded photo base path
     */
    uploadPhoto(photo, directory) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileName = `${Date.now()}-${photo.originalFilename}`;
            return yield new FileUpload_1.FileUpload().uploadFileOnS3(photo, directory, fileName);
        });
    }
    /**
     *
     * @param queryString
     * @returns
     */
    list(queryString) {
        return __awaiter(this, void 0, void 0, function* () {
            const countQuery = BannerModel_1.default.find({ isDeleted: false });
            const countFeature = new ApiFeatures_1.ApiFeatures(countQuery, queryString)
                .filtering()
                .searching(['name'])
                .getCount();
            const listQuery = BannerModel_1.default.find({ isDeleted: false });
            const listFeature = new ApiFeatures_1.ApiFeatures(listQuery, queryString)
                .filtering()
                .searching(['name'])
                .sorting('-createdAt')
                .fieldsLimiting()
                .pagination();
            const count = yield countFeature.query;
            const list = yield listFeature.query;
            return { list, count };
        });
    }
    /**
       *
       * @param id {String} banner id for edit banner
       * @param directory {String} photo directory
       * @returns {Promise<ProductInterface>} edit banner
       */
    edit(id, photo, clickUrl, deviceType) {
        return __awaiter(this, void 0, void 0, function* () {
            const banner = yield BannerModel_1.default.findById(id);
            let url = banner.photo;
            if (photo) {
                url = yield this.uploadPhoto(photo, S3Constant_1.S3_DIRECTORY.banner);
            }
            const updateBanner = yield BannerModel_1.default.findByIdAndUpdate(id, {
                photo: url,
                clickUrl,
                deviceType,
            }, {
                new: true
            });
            return updateBanner;
        });
    }
}
exports.default = new BannerService();
