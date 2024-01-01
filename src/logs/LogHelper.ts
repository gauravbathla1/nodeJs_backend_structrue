import { LOG_EXEC_STATUS } from "./LogTypeConstant"
import LogModel from "./LogModel"
import { ResInterface } from "../interfaces/ReqInterface";

/**
     *  create success log
     * @param res response object
     * @param execTime Api execution Time
     * @returns nothing.
     */


export const logSuccess = async (
    execTime: number,
    status: number,
    res: ResInterface,
): Promise<boolean> => {
    try {
        
        let user = res.logger.req?.user?._id || 'guest'
        let session = res.logger.req?.session?._id || 'guest'
        if (res.logger.req?.admin) {
            user = 'admin';
            session = 'admin'
        };
        const logData = {
            method: res.method,
            execStatus: LOG_EXEC_STATUS.success,
            execTime,
            api: res.api,
            user,
            session,
            status,
            message: res.logMsg || 'Success Response'
        }
        await LogModel.create(logData);
        return true;
    } catch (error) {
        return false;
    }


}

/**
     * create Error log
     * @param req request object
     * @param error error Object
     * @param status http response status code
     * @returns nothing.
     */
export const logError = async (
    res: ResInterface,
    error: any,
    status: number
): Promise<boolean> => {
    try {
        const req = res.logger.req;
        const execTime = new Date().getTime() - req.startTime;
        let data: { [key: string]: any } = {
            reqBody: req.body,
            reqParams: req.params,
            reqQuery: req.query,
            error
        };

        let user = res.logger.req?.user?._id || 'guest'
        let session = res.logger.req?.session?._id || 'guest'
        if (res.logger.req?.admin) {
            user = 'admin';
            session = 'admin'
        };

        await LogModel.create({
            method: req.method,
            execStatus: LOG_EXEC_STATUS.error,
            api: req.originalUrl,
            status,
            execTime,
            user,
            session,
            message: 'Internal server error',
            data: JSON.stringify(data, undefined, 2)
        });

        if (process.env.NODE_ENV !== 'prod') {
            console.log('Error', error)
        }
        return true;

    } catch (error) {
        return false;
    }
}

/**
     * create Failed log
     * @param res request object
     * @param error error Object
     * @param status http response status code
     * @returns nothing.
     */
export const logFailed = async (
    res: ResInterface,
    error: any,
    status: number
) => {
    try {
        const req = res.logger.req;
        const execTime = new Date().getTime() - req.startTime;
        let data: { [key: string]: any } = {
            reqBody: req.body,
            reqParams: req.params,
            reqQuery: req.query,
            error: error?.data
        };

        let user = res.logger.req?.user?._id || 'guest'
        let session = res.logger.req?.session?._id || 'guest'
        if (res.logger.req?.admin) {
            user = 'admin';
            session = 'admin'
        };
        await LogModel.create({
            method: req.method,
            execStatus: LOG_EXEC_STATUS.failed,
            api: req.originalUrl,
            status,
            execTime,
            message: error.message,
            user,
            session,
            data: JSON.stringify(data, undefined, 2)
        });

        return true;
    } catch (error) {
        console.log('Error', error)
        return true;
    }
}


