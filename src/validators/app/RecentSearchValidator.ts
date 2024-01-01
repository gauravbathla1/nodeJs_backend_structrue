import { NextFunction } from "express";
import Joi = require("joi");
import { validate } from "../../helpers/ValidateHelper";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
class RecentSearchValidator {


    async add (req:ReqInterface, res:ResInterface , next:NextFunction ) {

        try {
            const schema = Joi.object().keys({
                 userId:Joi.string().required(),
                 searchText:Joi.string().required()
            })

            const isValid = await validate(req.body, res, schema);

            if (isValid) {
                next();
            }

        } catch(error) {
            next(error)
        }

    }
}

export default new RecentSearchValidator();