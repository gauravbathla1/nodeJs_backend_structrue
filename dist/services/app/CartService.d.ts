import { CartInterface } from "../../interfaces/CartInterface";
declare class CartService {
    /**
        * @param productId {string} product of user
        * @param quantity{number} quantity
        * @param next {NextFunction} next function
        * @return {Promise<CartInterface>} add Cart
        */
    add(productId: string, userId: any, quantity: number): Promise<CartInterface>;
    /**
    *
    * @param id {String} cart id for deleting cart
    * @returns {Promise<CartInterface>} deleted cart
    */
    delete(id: string): Promise<CartInterface>;
}
declare const _default: CartService;
export default _default;
