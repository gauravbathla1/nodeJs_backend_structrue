"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    slug: {
        type: String,
        trim: true,
        lowercase: true
    },
    sku: {
        type: String,
    },
    price: {
        type: Number,
    },
    categoryId: {
        type: mongoose_1.Types.ObjectId,
    },
    categoryName: {
        type: String,
    },
    categorySlug: {
        type: String,
    },
    subcategoryName: {
        type: String
    },
    subcategorySlug: {
        type: String
    },
    subcategoryId: {
        type: mongoose_1.Types.ObjectId,
    },
    sectionId: {
        type: mongoose_1.Types.ObjectId,
    },
    sectionSlug: {
        type: String,
    },
    sectionName: {
        type: String
    },
    brandId: {
        type: mongoose_1.Types.ObjectId,
    },
    brandName: {
        type: String
    },
    brandSlug: {
        type: String
    },
    author: {
        type: String,
    },
    stock: {
        type: Number,
    },
    description: {
        type: String
    },
    regularPrice: {
        type: Number,
    },
    salePrice: {
        type: Number,
    },
    taxClass: {
        type: String
    },
    taxStatus: {
        type: String
    },
    taxClassCode: {
        type: String
    },
    stockQuantity: {
        type: Number
    },
    allowBackOrders: {
        type: Boolean
    },
    lowStockThreshold: {
        type: Number,
    },
    soldIndividualStock: {
        type: Number,
    },
    weight: {
        type: Number
    },
    weightUnit: {
        type: String,
    },
    dimensions: {
        type: String
    },
    shippingClass: {
        type: String
    },
    upSells: {
        type: Boolean
    },
    crossSells: {
        type: Boolean
    },
    // color: {
    //     type: String
    // },
    material: {
        type: String
    },
    purchasedNote: {
        type: String
    },
    menuOrder: {
        type: String
    },
    isReviewEnabled: {
        type: Boolean,
    },
    adminCommissionType: {
        type: String,
    },
    adminCommission: {
        type: Number
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    cashbackTypes: {
        type: [{
                cashbackType: {
                    type: String
                },
                amount: {
                    type: Number
                }
            }],
        default: []
    },
    coverPhoto: {
        type: String
    },
    photos: {
        type: [String],
        default: []
    },
    colors: {
        type: [{
                type: String,
                trim: true,
                lowercase: true
            }],
        default: []
    },
    ratingsTotal: {
        type: Number,
        default: 0
    },
    ratingsAvg: {
        type: Number,
        default: 0
    },
    totalReports: {
        type: Number,
        default: 0
    },
    productSold: {
        type: Number,
        default: 0
    },
    attributes: {
        _id: false,
        type: [
            {
                name: {
                    type: String,
                },
                values: [
                    {
                        type: String,
                        lowercase: true,
                        trim: true
                    }
                ]
            }
        ],
        default: []
    },
    attributeValues: {
        type: [
            {
                type: String,
                lowercase: true,
                trim: true
            }
        ],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });
productSchema.index({ categoryId: 1 });
productSchema.index({ subcategoryId: 1 });
productSchema.index({ brandSlug: 1 });
productSchema.index({ categorySlug: 1 });
productSchema.index({ subcategorySlug: 1 });
productSchema.index({ sectionSlug: 1 });
productSchema.index({ sectionId: 1 });
productSchema.index({ sku: 1 }, { unique: true });
productSchema.index({ name: 1 }, { textIndexVersion: 1 });
const ProductModel = (0, mongoose_1.model)('Product', productSchema);
exports.default = ProductModel;
