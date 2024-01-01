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
const GroupInterface_1 = require("../../interfaces/GroupInterface");
class GroupValidator {
    createGroup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object().keys({
                    name: Joi.string().required(),
                    description: Joi.string().required(),
                    goalInterval: Joi.number().required().valid(GroupInterface_1.GoalInterval.daily, GroupInterface_1.GoalInterval.weekly, GroupInterface_1.GoalInterval.yearly),
                    goalPrice: Joi.number().required(),
                    showContactInfo: Joi.boolean().optional(),
                    phoneNumber: Joi.string().required(),
                    email: Joi.string().trim().email().required(),
                    address: Joi.string().required(),
                    showSocialInfo: Joi.boolean().optional(),
                    facebookUrl: Joi.string().optional(),
                    twitterUrl: Joi.string().optional(),
                    others: Joi.boolean().optional(),
                    purpose: Joi.string().required(),
                    groupIcon: Joi.any().optional(),
                    city: Joi.string().trim().required(),
                    state: Joi.string().trim().required(),
                    zipCode: Joi.string().trim().optional(),
                });
                const isValid = yield (0, ValidateHelper_1.validate)(Object.assign(Object.assign({}, req.body), req.files), res, schema);
                if (isValid) {
                    next();
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    editGroup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object().keys({
                    name: Joi.string().optional(),
                    goalInterval: Joi.number().optional().valid(GroupInterface_1.GoalInterval.daily, GroupInterface_1.GoalInterval.weekly, GroupInterface_1.GoalInterval.yearly),
                    goalPrice: Joi.number().optional(),
                    description: Joi.string().optional(),
                    showContactInfo: Joi.boolean().optional(),
                    showSocialInfo: Joi.boolean().optional(),
                    phoneNumber: Joi.string().optional(),
                    email: Joi.string().trim().email().optional(),
                    address: Joi.string().optional(),
                    facebookUrl: Joi.string().optional(),
                    twitterUrl: Joi.string().optional(),
                    city: Joi.string().optional(),
                    state: Joi.string().optional(),
                    zipCode: Joi.string().optional(),
                    groupIcon: Joi.any().optional(),
                });
                const isValid = yield (0, ValidateHelper_1.validate)(Object.assign(Object.assign({}, req.body), req.files), res, schema);
                if (isValid) {
                    next();
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    addMember(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object().keys({
                    userId: Joi.string().trim().required(),
                    groupId: Joi.string().trim().required()
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
    groupRequestAction(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object().keys({
                    isAccept: Joi.boolean().required(),
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
    removeMember(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object().keys({
                    memberId: Joi.string().trim().required(),
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
    addToFavourite(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object().keys({
                    groupId: Joi.string().trim().required()
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
    join(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object().keys({
                    groupId: Joi.string().trim().required()
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
    inviteMember(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object().keys({
                    groupId: Joi.string().trim().required(),
                    emails: Joi.array().items(Joi.string().trim().required()),
                    content: Joi.string().trim().required()
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
exports.default = new GroupValidator();
