import { ResInterface } from "../interfaces/ReqInterface";
/**
     *  create success log
     * @param res response object
     * @param execTime Api execution Time
     * @returns nothing.
     */
export declare const logSuccess: (execTime: number, status: number, res: ResInterface) => Promise<boolean>;
/**
     * create Error log
     * @param req request object
     * @param error error Object
     * @param status http response status code
     * @returns nothing.
     */
export declare const logError: (res: ResInterface, error: any, status: number) => Promise<boolean>;
/**
     * create Failed log
     * @param res request object
     * @param error error Object
     * @param status http response status code
     * @returns nothing.
     */
export declare const logFailed: (res: ResInterface, error: any, status: number) => Promise<boolean>;
