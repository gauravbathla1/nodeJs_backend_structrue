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
const ResponseHelper_1 = require("../../helpers/ResponseHelper");
const SlugHelper_1 = require("../../helpers/SlugHelper");
const ProductModel_1 = require("../../models/ProductModel");
const SectionModel_1 = require("../../models/SectionModel");
const SubcategoryModel_1 = require("../../models/SubcategoryModel");
const ApiFeatures_1 = require("../../utils/ApiFeatures");
const FileUpload_1 = require("../../utils/FileUpload");
const SearchService_1 = require("./SearchService");
class SectionService {
    /**
     *
     * @param category category id
     * @param subcategory subcategory id
     * @param name section name
     * @param res {Promise<SectionInterface>}
     */
    add(category, subcategory, name, image, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExist = yield SubcategoryModel_1.default.findOne({ category, _id: subcategory, isDeleted: false });
            if (isExist) {
                const slug = yield (0, SlugHelper_1.generateSlug)(name, 'Section');
                const imageRemoteName = yield this.uploadSectionImage(image);
                const newSection = yield SectionModel_1.default.create({
                    category,
                    subcategory,
                    name,
                    slug,
                    image: imageRemoteName,
                    categorySlug: isExist.categorySlug,
                    subcategorySlug: isExist.slug
                });
                yield SearchService_1.default.addSectionDocument(newSection);
                return newSection;
            }
            return ResponseHelper_1.default.badRequest(res, res.__('invalid_category_subcategory'), { category, subcategory });
        });
    }
    /**
     *
     * @param file any file
     * @returns upload file base path on s3
     */
    uploadSectionImage(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const directory = S3Constant_1.S3_DIRECTORY.section;
            const fileName = file.originalFilename;
            return yield new FileUpload_1.FileUpload().uploadFileOnS3(file, directory, fileName);
        });
    }
    /**
    *
    * @param id {String} section id for fetching section
    * @returns {Promise<SectionInterface>} section data by id
    */
    getSectionData(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const getSectionData = yield SectionModel_1.default.findById(id);
            return getSectionData;
        });
    }
    /**
     *
     * @param sectionId {String} section id for updating section
     * @param category {String} category id
     * @param subcategory {String} subcategory id
     * @param name {String} name of section
     * @param res response Object
     * @returns {Promise<SectionInterface>} update section object
     */
    update(sectionId, category, subcategory, name, image, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExist = yield SubcategoryModel_1.default.findOne({ category, _id: subcategory, isDeleted: false });
            if (isExist) {
                const section = yield SectionModel_1.default.findById(sectionId);
                let slug = section.slug;
                if (section.name !== name) {
                    slug = yield (0, SlugHelper_1.generateSlug)(name, 'Section');
                }
                let imageUrl = section.image;
                if (image)
                    imageUrl = yield this.uploadSectionImage(image);
                section.slug = slug;
                section.name = name;
                section.image = imageUrl;
                yield section.save();
                yield ProductModel_1.default.updateMany({
                    sectionId: sectionId
                }, {
                    sectionName: name,
                    sectionSlug: slug
                });
                yield SearchService_1.default.updateSectionDocument(section);
                return section;
            }
            return ResponseHelper_1.default.badRequest(res, res.__('invalid_category_subcategory'), { category, subcategory });
        });
    }
    /**
     *
     * @param id {String} section id for deleting section
     * @returns {Promise<SectionInterface>} deleted section
     */
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedSection = yield SectionModel_1.default.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
            return deletedSection;
        });
    }
    /**
    *
    * @param queryString req query object
    * @params subcategory id of subcategory
    * @returns
    */
    list(queryString, subcategory) {
        return __awaiter(this, void 0, void 0, function* () {
            const countQuery = SectionModel_1.default.find({ isDeleted: false, subcategory });
            const countFeature = new ApiFeatures_1.ApiFeatures(countQuery, queryString)
                .filtering()
                .searching(['name'])
                .getCount();
            const lisQuery = SectionModel_1.default.find({ isDeleted: false, subcategory });
            const listFeature = new ApiFeatures_1.ApiFeatures(lisQuery, queryString)
                .filtering()
                .searching(['name'])
                .sorting('-createdAt')
                .fieldsLimiting()
                .pagination();
            const count = yield countFeature.query;
            const list = yield listFeature.query;
            return { count, list };
        });
    }
}
exports.default = new SectionService();
