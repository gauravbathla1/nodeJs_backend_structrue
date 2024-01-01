import { NextFunction } from "express";
import Joi = require("joi");
import { validate } from "../../helpers/ValidateHelper";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
class CartValidator {

    async add(req: ReqInterface, res: ResInterface, next: NextFunction) {

        try {
            const schema = Joi.object().keys({
                products: Joi.array().items(
                    Joi.object().keys({
                        productId: Joi.string().required(),
                        quantity: Joi.number().required()
                    })
                )
            })

            const isValid = await validate(req.body, res, schema);

            if (isValid) {
                next();
            }

        } catch (error) {
            next(error)
        }

    }
}

export default new CartValidator();