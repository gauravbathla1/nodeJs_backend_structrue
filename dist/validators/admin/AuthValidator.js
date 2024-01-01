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
class AuthValidator {
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                email: Joi.string().required(),
                password: Joi.string().required()
            });
            const isValid = yield (0, ValidateHelper_1.validate)(req.body, res, schema);
            if (isValid) {
                next();
            }
        });
    }
    socialLogin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                email: Joi.string().required(),
                social_id: Joi.string().required(),
                name: Joi.string().optional(),
                type: Joi.string().valid('GOOGLE', 'APPLE').required(),
                social_token: Joi.string().required(),
            });
            const isValid = yield (0, ValidateHelper_1.validate)(req.body, res, schema);
            if (isValid) {
                next();
            }
        });
    }
    guestLogin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                deviceId: Joi.string().required()
            });
            const isValid = yield (0, ValidateHelper_1.validate)(req.body, res, schema);
            if (isValid) {
                next();
            }
        });
    }
    changePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                password: Joi.string().required(),
                passwordCurrent: Joi.string().required()
            });
            const isValid = yield (0, ValidateHelper_1.validate)(req.body, res, schema);
            if (isValid) {
                next();
            }
        });
    }
    forgotPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                email: Joi.string().required(),
            });
            const isValid = yield (0, ValidateHelper_1.validate)(req.body, res, schema);
            if (isValid) {
                next();
            }
        });
    }
    verifyLinkVal(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                id: Joi.string().required(),
                otp: Joi.string().required(),
            });
            const isValid = yield (0, ValidateHelper_1.validate)(req.body, res, schema);
            if (isValid) {
                next();
            }
        });
    }
}
exports.default = new AuthValidator();
