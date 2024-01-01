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
const ValidateHelper_1 = require("../../helpers/ValidateHelper");
const UserInterface_1 = require("../../interfaces/UserInterface");
const Joi = require("joi");
class AuthValidator {
    signup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object().keys({
                    email: Joi.string().trim().required(),
                    password: Joi.string().trim().required(),
                    groupId: Joi.string().trim().optional()
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
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object().keys({
                    email: Joi.string().required(),
                    password: Joi.string().required(),
                    deviceType: Joi.string().valid(UserInterface_1.DeviceType.android, UserInterface_1.DeviceType.ios, UserInterface_1.DeviceType.web)
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
    forgotPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object().keys({
                    email: Joi.string().required()
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
    resendVerification(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object().keys({
                    email: Joi.string().required()
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
    resetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object().keys({
                    resetToken: Joi.string().required(),
                    password: Joi.string().required(),
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
exports.default = new AuthValidator();
