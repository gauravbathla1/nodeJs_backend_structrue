import { validate } from '../../helpers/ValidateHelper';
import { ResInterface, ReqInterface } from '../../interfaces/ReqInterface';
import { DeviceType } from '../../interfaces/UserInterface';
import { NextFunction } from 'express';
import * as Joi from 'joi';

class AuthValidator {
    async signup(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {
            const schema = Joi.object().keys({
                email: Joi.string().trim().required(),
                password: Joi.string().trim().required(),
                groupId: Joi.string().trim().optional()
            });

            const isValid = await validate(req.body, res, schema);

            if (isValid) {
                next();
            }
        } catch (error) {
            next(error);
        }
    }


    async login(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {
            const schema = Joi.object().keys({
                email: Joi.string().required(),
                password: Joi.string().required(),
                deviceType: Joi.string().valid(DeviceType.android, DeviceType.ios, DeviceType.web)
            });

            const isValid = await validate(req.body, res, schema);

            if (isValid) {
                next();
            }
        } catch (error) {
            next(error);
        }
    }

    async forgotPassword(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {
            const schema = Joi.object().keys({
                email: Joi.string().required()
            });

            const isValid = await validate(req.body, res, schema);

            if (isValid) {
                next();
            }
        } catch (error) {
            next(error);
        }
    }

    async resendVerification(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {
            const schema = Joi.object().keys({
                email: Joi.string().required()
            });

            const isValid = await validate(req.body, res, schema);

            if (isValid) {
                next();
            }
        } catch (error) {
            next(error);
        }
    }

    async resetPassword(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {
            const schema = Joi.object().keys({
                resetToken: Joi.string().required(),
                password: Joi.string().required(),
            });

            const isValid = await validate(req.body, res, schema);

            if (isValid) {
                next();
            }
        } catch (error) {
            next(error);
        }
    }

}

export default new AuthValidator();