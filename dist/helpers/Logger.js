"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
// import DataDog from "../utils/Logger";
const logger = (req, res, next) => {
    // const logger = new DataDog(req)
    res.logger = exports.logger;
    next();
};
exports.logger = logger;
