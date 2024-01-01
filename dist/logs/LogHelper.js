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
exports.logFailed = exports.logError = exports.logSuccess = void 0;
const LogTypeConstant_1 = require("./LogTypeConstant");
const LogModel_1 = require("./LogModel");
/**
     *  create success log
     * @param res response object
     * @param execTime Api execution Time
     * @returns nothing.
     */
const logSuccess = (execTime, status, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    try {
        let user = ((_b = (_a = res.logger.req) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b._id) || 'guest';
        let session = ((_d = (_c = res.logger.req) === null || _c === void 0 ? void 0 : _c.session) === null || _d === void 0 ? void 0 : _d._id) || 'guest';
        if ((_e = res.logger.req) === null || _e === void 0 ? void 0 : _e.admin) {
            user = 'admin';
            session = 'admin';
        }
        ;
        const logData = {
            method: res.method,
            execStatus: LogTypeConstant_1.LOG_EXEC_STATUS.success,
            execTime,
            api: res.api,
            user,
            session,
            status,
            message: res.logMsg || 'Success Response'
        };
        yield LogModel_1.default.create(logData);
        return true;
    }
    catch (error) {
        return false;
    }
});
exports.logSuccess = logSuccess;
/**
     * create Error log
     * @param req request object
     * @param error error Object
     * @param status http response status code
     * @returns nothing.
     */
const logError = (res, error, status) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g, _h, _j, _k;
    try {
        const req = res.logger.req;
        const execTime = new Date().getTime() - req.startTime;
        let data = {
            reqBody: req.body,
            reqParams: req.params,
            reqQuery: req.query,
            error
        };
        let user = ((_g = (_f = res.logger.req) === null || _f === void 0 ? void 0 : _f.user) === null || _g === void 0 ? void 0 : _g._id) || 'guest';
        let session = ((_j = (_h = res.logger.req) === null || _h === void 0 ? void 0 : _h.session) === null || _j === void 0 ? void 0 : _j._id) || 'guest';
        if ((_k = res.logger.req) === null || _k === void 0 ? void 0 : _k.admin) {
            user = 'admin';
            session = 'admin';
        }
        ;
        yield LogModel_1.default.create({
            method: req.method,
            execStatus: LogTypeConstant_1.LOG_EXEC_STATUS.error,
            api: req.originalUrl,
            status,
            execTime,
            user,
            session,
            message: 'Internal server error',
            data: JSON.stringify(data, undefined, 2)
        });
        if (process.env.NODE_ENV !== 'prod') {
            console.log('Error', error);
        }
        return true;
    }
    catch (error) {
        return false;
    }
});
exports.logError = logError;
/**
     * create Failed log
     * @param res request object
     * @param error error Object
     * @param status http response status code
     * @returns nothing.
     */
const logFailed = (res, error, status) => __awaiter(void 0, void 0, void 0, function* () {
    var _l, _m, _o, _p, _q;
    try {
        const req = res.logger.req;
        const execTime = new Date().getTime() - req.startTime;
        let data = {
            reqBody: req.body,
            reqParams: req.params,
            reqQuery: req.query,
            error: error === null || error === void 0 ? void 0 : error.data
        };
        let user = ((_m = (_l = res.logger.req) === null || _l === void 0 ? void 0 : _l.user) === null || _m === void 0 ? void 0 : _m._id) || 'guest';
        let session = ((_p = (_o = res.logger.req) === null || _o === void 0 ? void 0 : _o.session) === null || _p === void 0 ? void 0 : _p._id) || 'guest';
        if ((_q = res.logger.req) === null || _q === void 0 ? void 0 : _q.admin) {
            user = 'admin';
            session = 'admin';
        }
        ;
        yield LogModel_1.default.create({
            method: req.method,
            execStatus: LogTypeConstant_1.LOG_EXEC_STATUS.failed,
            api: req.originalUrl,
            status,
            execTime,
            message: error.message,
            user,
            session,
            data: JSON.stringify(data, undefined, 2)
        });
        return true;
    }
    catch (error) {
        console.log('Error', error);
        return true;
    }
});
exports.logFailed = logFailed;
