import { WishlistInterface } from "../../interfaces/WishlistInterface";
import { ObjectId } from 'mongoose';
declare class WishlistService {
    /**
     * @param ProductId {string} product of user
     * @param next {NextFunction} next function
     * @return {Promise<UserInterface>} add wishlist
     */
    add(productId: string, userId: ObjectId): Promise<WishlistInterface>;
    /**
     *
     * @param queryString
     * @returns
     */
    list(queryString: any): Promise<{
        count: number;
        list: WishlistInterface[];
    }>;
}
declare const _default: WishlistService;
export default _default;
