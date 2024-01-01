import { ProductInterface } from "../../interfaces/ProductInterface";
declare class ProductService {
    productList(queryObj: any): Promise<{
        count: number;
        products: any[];
    }>;
    private setFilters;
    private getSort;
    private skipLimit;
    private setFacet;
    private countProject;
    private wishlistCheck;
    private cartCheck;
    private projectKeys;
    productDetails(productId: string, userId?: string): Promise<{
        product: any;
        relatedProducts: ProductInterface[];
    }>;
}
declare const _default: ProductService;
export default _default;
