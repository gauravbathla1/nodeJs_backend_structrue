import { NextFunction } from 'express';
import * as Joi from 'joi';
import { validate } from '../../helpers/ValidateHelper';
import { ReqInterface, ResInterface } from '../../interfaces/ReqInterface';

class AuthValidator {
    async login(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const schema = Joi.object().keys({
            email: Joi.string().required(),
            password: Joi.string().required()
        });

        const isValid = await validate(req.body, res, schema);
        if (isValid) {
            next();
        }

    }

    async socialLogin(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const schema = Joi.object().keys({
            email: Joi.string().required(),
            social_id: Joi.string().required(),
            name:Joi.string().optional(),
            type: Joi.string().valid('GOOGLE','APPLE').required(),
            social_token:Joi.string().required(),
        });

        const isValid = await validate(req.body, res, schema);
        if (isValid) {
            next();
        }

    }

    async guestLogin(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const schema = Joi.object().keys({
           deviceId:Joi.string().required()
        });

        const isValid = await validate(req.body, res, schema);
        if (isValid) {
            next();
        }

    }


    async changePassword(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const schema = Joi.object().keys({
            password: Joi.string().required(),
            passwordCurrent: Joi.string().required()
        });

        const isValid = await validate(req.body, res, schema);
        if (isValid) {
            next();
        }

    }

    async forgotPassword(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const schema = Joi.object().keys({
            email: Joi.string().required(),
        });

        const isValid = await validate(req.body, res, schema);
        if (isValid) {
            next();
        }

    }

    async verifyLinkVal(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const schema = Joi.object().keys({
            id: Joi.string().required(),
            otp: Joi.string().required(),
        });

        const isValid = await validate(req.body, res, schema);
        if (isValid) {
            next();
        }

    }
}

export default new AuthValidator();