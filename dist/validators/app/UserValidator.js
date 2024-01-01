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
class UserValidator {
    profile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object().keys({
                    profilePic: Joi.any().optional(),
                    avatar: Joi.string().optional(),
                    email: Joi.string().required(),
                    firstName: Joi.string().required(),
                    lastName: Joi.string().required(),
                    displayName: Joi.string().required(),
                    // accountNumber: Joi.number().required(),
                    paypalEmail: Joi.string().required(),
                    description: Joi.string().required(),
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
    updateSocial(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object().keys({
                    facebookProfileUrl: Joi.string().trim().optional().allow(''),
                    linkedinProfileUrl: Joi.string().trim().optional().allow(''),
                    twitterUsername: Joi.string().trim().optional().allow(''),
                    instagramUsername: Joi.string().trim().optional().allow('')
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
    verifyEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object().keys({
                    email: Joi.string().trim().required(),
                    token: Joi.string().trim().required(),
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
    changePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object().keys({
                    password: Joi.string().trim().required(),
                    passwordCurrent: Joi.string().trim().required(),
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
exports.default = new UserValidator();
