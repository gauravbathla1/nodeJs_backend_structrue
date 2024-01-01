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
class SubgroupValidator {
    createSubgroup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object().keys({
                    groupId: Joi.string().required(),
                    groupName: Joi.string().required(),
                    name: Joi.string().required(),
                    description: Joi.string().required(),
                    icon: Joi.any().required()
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
                    subgroupId: Joi.string().required(),
                    memberId: Joi.string().required(),
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
                    memberId: Joi.string().required(),
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
    editSubgroup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object().keys({
                    groupId: Joi.string().optional(),
                    groupName: Joi.string().optional(),
                    name: Joi.string().optional(),
                    description: Joi.string().optional(),
                    icon: Joi.any().optional()
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
}
exports.default = new SubgroupValidator();
