import { ObjectId } from "aws-sdk/clients/codecommit";
import { ReportReasonInterface } from "../../interfaces/ReportReasonInterface";
declare class ReportReasonService {
    /**
     *
     * @param title {string} title of reportreason
     * @param text {string} text of reportreason
     * @returns reportreason {Promise<ReportReasonInterface>} new added reportreason
     */
    add(categoryId: ObjectId, title: string, text: string): Promise<ReportReasonInterface>;
    /**
    *
    * @param _id id of reportreason
    * @param title title of reportreason
    * @param text text of reportreason
    * @returns  {Promise<ReportInterface>}
    */
    update(_id: string, title: string, text: string): Promise<ReportReasonInterface>;
    /**
   * @description listing of reportreason
   * @param queryString req query object
   * @returns
   */
    list(queryString: any): Promise<{
        count: number;
        list: ReportReasonInterface[];
    }>;
}
declare const _default: ReportReasonService;
export default _default;
