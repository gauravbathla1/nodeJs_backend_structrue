import { NextFunction } from "express";
import Joi = require("joi");
import { validate } from "../../helpers/ValidateHelper";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";

class UserValidator {

    async profile(req: ReqInterface, res: ResInterface, next: NextFunction) {
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

            const isValid = await validate(req.body, res, schema);

            if (isValid) {
                next();
            }
        } catch (error) {
            next(error);
        }
    }


    async updateSocial(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {
            const schema = Joi.object().keys({
                facebookProfileUrl: Joi.string().trim().optional().allow(''),
                linkedinProfileUrl: Joi.string().trim().optional().allow(''),
                twitterUsername: Joi.string().trim().optional().allow(''),
                instagramUsername: Joi.string().trim().optional().allow('')
            });

            const isValid = await validate(req.body, res, schema);

            if (isValid) {
                next();
            }
        } catch (error) {
            next(error)
        }
    }

    async verifyEmail(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {
            const schema = Joi.object().keys({
                email: Joi.string().trim().required(),
                token: Joi.string().trim().required(),
            });

            const isValid = await validate(req.body, res, schema);

            if (isValid) {
                next();
            }
        } catch (error) {
            next(error);
        }
    }

    async changePassword(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {
            const schema = Joi.object().keys({
                password: Joi.string().trim().required(),
                passwordCurrent: Joi.string().trim().required(),
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

export default new UserValidator();