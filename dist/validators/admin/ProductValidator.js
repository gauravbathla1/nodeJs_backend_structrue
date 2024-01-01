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
const Joi = require("joi");
const ValidateHelper_1 = require("../../helpers/ValidateHelper");
class ProductValidator {
    add(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object().keys({
                    name: Joi.string().required(),
                    price: Joi.number().optional(),
                    categoryId: Joi.string().required(),
                    categoryName: Joi.string().optional(),
                    subcategoryName: Joi.string().optional(),
                    subcategoryId: Joi.string().required(),
                    brandId: Joi.string().required(),
                    sectionId: Joi.string().required(),
                    sectionName: Joi.string().optional(),
                    author: Joi.string().required(),
                    stock: Joi.number().required(),
                    description: Joi.string().required(),
                    regularPrice: Joi.number().required(),
                    salePrice: Joi.number().required(),
                    taxClass: Joi.string().required(),
                    taxStatus: Joi.string().required(),
                    taxClassCode: Joi.string().required(),
                    stockQuantity: Joi.number().required(),
                    allowBackOrders: Joi.boolean().required(),
                    lowStockThreshold: Joi.number().required(),
                    soldIndividualStock: Joi.number().required(),
                    weight: Joi.number().required(),
                    weightUnit: Joi.string().required(),
                    dimensions: Joi.string().required(),
                    shippingClass: Joi.string().required(),
                    upSells: Joi.boolean().required(),
                    crossSells: Joi.boolean().required(),
                    material: Joi.string().required(),
                    purchasedNote: Joi.string().required(),
                    menuOrder: Joi.string().required(),
                    isReviewEnabled: Joi.boolean().required(),
                    adminCommissionType: Joi.string().required(),
                    adminCommission: Joi.number().required(),
                    cashbackTypes: Joi.array().required(),
                    colors: Joi.array().items(Joi.string().trim()).optional()
                    //coverPhoto:Joi.string().required(),
                    // photos:Joi.string().required(),
                });
                const isValid = yield (0, ValidateHelper_1.validate)(req.body, res, schema);
                if (isValid) {
                    next();
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new ProductValidator();
