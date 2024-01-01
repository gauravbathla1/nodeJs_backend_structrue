import { ProductReportInterface } from "../../interfaces/ProductReportInterface";
declare class ProductReportService {
    list(queryString: any): Promise<{
        count: number;
        reports: ProductReportInterface[];
    }>;
}
declare const _default: ProductReportService;
export default _default;
