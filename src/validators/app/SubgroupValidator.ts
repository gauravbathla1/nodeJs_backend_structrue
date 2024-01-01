import { NextFunction } from "express";
import Joi = require("joi");
import { validate } from "../../helpers/ValidateHelper";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";

class SubgroupValidator {
    async createSubgroup(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {
            const schema = Joi.object().keys({
                groupId: Joi.string().required(),
                groupName: Joi.string().required(),
                name: Joi.string().required(),
                description: Joi.string().required(),
                icon: Joi.any().required()
            });
            const isValid = await validate({ ...req.body, ...req.files }, res, schema);
            if (isValid) {
                next();
            }
        } catch (error) {
            next(error);
        }
    }

    async addMember(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {
            const schema = Joi.object().keys({
                subgroupId: Joi.string().required(),
                memberId: Joi.string().required(),
            });
            const isValid = await validate(req.body, res, schema);
            if (isValid) {
                next();
            }
        } catch (error) {
            next(error);
        }
    }

    async removeMember(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {
            const schema = Joi.object().keys({
                memberId: Joi.string().required(),
            });
            const isValid = await validate(req.body, res, schema);
            if (isValid) {
                next();
            }
        } catch (error) {
            next(error);
        }
    }

    async editSubgroup(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {
            const schema = Joi.object().keys({
                groupId: Joi.string().optional(),
                groupName: Joi.string().optional(),
                name: Joi.string().optional(),
                description: Joi.string().optional(),
                icon: Joi.any().optional()
            });
            const isValid = await validate({ ...req.body, ...req.files }, res, schema);
            if (isValid) {
                next();
            }
        } catch (error) {
            next(error);
        }
    }
}

export default new SubgroupValidator();