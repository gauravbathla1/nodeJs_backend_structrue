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
const BrandModel_1 = require("../../models/BrandModel");
const FileUpload_1 = require("../../utils/FileUpload");
const ApiFeatures_1 = require("../../utils/ApiFeatures");
const ProductModel_1 = require("../../models/ProductModel");
const SlugHelper_1 = require("../../helpers/SlugHelper");
class BrandService {
    /**
     *
     * @param name
     * @param logoImage
     * @param categories
     * @returns new added brand
     */
    addBrand(name, logoImage, categories) {
        return __awaiter(this, void 0, void 0, function* () {
            const slug = yield (0, SlugHelper_1.generateSlug)(name, 'Brand');
            const logo = yield this.uploadBrandImage(logoImage);
            return { brand: yield BrandModel_1.default.create({ name, logo, categories, slug }) };
        });
    }
    /**
     *
     * @param file any file
     * @returns upload file base path on s3
     */
    uploadBrandImage(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const directory = S3Constant_1.S3_DIRECTORY.brand;
            const fileName = file.originalFilename;
            return yield new FileUpload_1.FileUpload().uploadFileOnS3(file, directory, fileName);
        });
    }
    /**
     *
     * @param queryString
     * @returns
     */
    list(queryString) {
        return __awaiter(this, void 0, void 0, function* () {
            const countQuery = BrandModel_1.default.find({ isDeleted: false });
            const countFeature = new ApiFeatures_1.ApiFeatures(countQuery, queryString)
                .filtering()
                .searching(['name'])
                .getCount();
            const listQuery = BrandModel_1.default.find({ isDeleted: false });
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
    edit(id, logoImage, name, categories) {
        return __awaiter(this, void 0, void 0, function* () {
            const brand = yield BrandModel_1.default.findById(id);
            let logo = brand.logo;
            const slug = yield (0, SlugHelper_1.generateSlug)(name, 'Brand');
            if (logoImage) {
                logo = yield this.uploadBrandImage(logoImage);
            }
            brand.name = name;
            brand.categories = categories;
            brand.logo = logo;
            brand.updateAt = new Date();
            brand.slug = slug;
            yield brand.save();
            yield ProductModel_1.default.updateMany({ brandId: brand._id }, { brandName: brand.name, brandSlug: brand.slug });
            return brand;
        });
    }
}
exports.default = new BrandService();
