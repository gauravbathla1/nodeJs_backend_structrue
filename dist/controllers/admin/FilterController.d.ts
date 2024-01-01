import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
declare class FilterController {
    /**
       * @api {get} /api/v1/admin/filter Filter List
       * @apiHeader {String} App-Version Version Code 1.0.0.
       * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
       * @apiVersion 1.0.0
       * @apiName filter-list
       * @apiGroup Admin-Filter
       * @apiSuccessExample {json} Success-Response-1:
       *   {
       *    "status": 200,
       *    "statusText": "SUCCESS",
       *   "message": "Filter list fetch successfully",
       *   "data": {
       *  "list": [
       *    {
       *        "subcategories": {
       *            "displayName": "product categories",
       *            "queryKey": "subcategory",
       *            "list": [
       *                {
       *                    "name": "Kid's crafts",
       *                    "_id": "62dfd43efb89c4b45de44f18"
       *                }
       *            ]
       *        },
       *        "brands": {
       *            "displayName": "brands",
       *            "queryKey": "brands",
       *            "list": [
       *                {
       *                    "name": "My Brnad",
       *                    "_id": "62f20e7b462b16cab5e16fbf"
       *                }
       *            ]
       *        },
       *        "price": {
       *            "displayKey": "price",
       *            "queryKey": "price",
       *            "minPrice": 40,
       *            "maxPrice": 450000
       *        },
       *        "color": {
       *            "displayKey": "color",
       *            "queryKey": "colors",
       *            "list": [
       *                "red",
       *                "blue"
       *            ]
       *        },
       *        "attributes": {
       *            "queryKey": "attributes",
       *            "attributes": [
       *                {
       *                    "displayKey": "sizes",
       *                    "queryKey": "sizes",
       *                    "list": [
       *                        "x",
       *                        "M",
       *                        "XL",
       *                        "XXL",
       *                        "xs"
       *                    ]
       *                },
       *                {
       *                    "displayKey": "fabric",
       *                    "queryKey": "fabric",
       *                    "list": [
       *                        "nylon"
       *                    ]
       *                },
       *                {
       *                    "displayKey": "patters",
       *                    "queryKey": "patters",
       *                    "list": [
       *                        "regular"
       *                    ]
       *                }
       *            ]
       *        },
       *        "_id": "62f24134f340f9f48352e9a3",
       *        "categoryId": "62df8560920908884958dd49"
       *    },
       *    {
       *        "subcategories": {
       *            "displayName": "product categories",
       *            "queryKey": "subcategory",
       *            "list": [
       *                {
       *                    "name": "Kid's crafts",
       *                    "_id": "62dfd43efb89c4b45de44f18"
       *                }
       *            ]
       *        },
       *        "brands": {
       *            "displayName": "brands",
       *            "queryKey": "brands",
       *            "list": [
       *                {
       *                    "name": "My Brnad",
       *                    "_id": "62f20e7b462b16cab5e16fbf"
       *                }
       *            ]
       *        },
       *        "price": {
       *            "displayKey": "price",
       *            "queryKey": "price",
       *            "minPrice": 2000,
       *            "maxPrice": 2000
       *        },
       *        "color": {
       *            "displayKey": "color",
       *            "queryKey": "colors",
       *            "list": []
       *        },
       *        "attributes": {
       *            "queryKey": "attributes",
       *            "attributes": []
       *        },
       *        "_id": "62f35113cc6f503ef4ab815f",
       *        "categoryId": "62e224b0fb89c4b45de4655e"
       *    },
       *    {
       *        "subcategories": {
       *            "displayName": "product categories",
       *            "queryKey": "subcategory",
       *            "list": [
       *                {
       *                    "name": "shirtSubcategory",
       *                    "_id": "62f394349244e1b9fcc9c586"
       *                }
       *            ]
       *        },
       *        "brands": {
       *            "displayName": "brands",
       *            "queryKey": "brands",
       *            "list": [
       *                {
       *                    "name": "My Brnad",
       *                    "_id": "62f20e7b462b16cab5e16fbf"
       *                }
       *            ]
       *        },
       *        "price": {
       *            "displayKey": "price",
       *            "queryKey": "price",
       *            "minPrice": 2000,
       *            "maxPrice": 2000
       *        },
       *        "color": {
       *            "displayKey": "color",
       *            "queryKey": "colors",
       *            "list": []
       *        },
       *        "attributes": {
       *            "queryKey": "attributes",
       *            "attributes": []
       *        },
       *        "_id": "62f3955d9244e1b9fcc9c5cd",
       *        "categoryId": "62f3940b9244e1b9fcc9c575"
       *    },
       *    {
       *        "subcategories": {
       *            "displayName": "product categories",
       *            "queryKey": "subcategory",
       *            "list": [
       *                {
       *                    "name": "Cricket Bat",
       *                    "_id": "62f5dd0b20098408379216bf"
       *                }
       *            ]
       *        },
       *        "brands": {
       *            "displayName": "brands",
       *            "queryKey": "brands",
       *            "list": [
       *                {
       *                    "name": "MRF",
       *                    "_id": "62f5e10b2009840837921794"
       *                }
       *            ]
       *        },
       *        "price": {
       *            "displayKey": "price",
       *            "queryKey": "price",
       *            "minPrice": 2000,
       *            "maxPrice": 6000
       *        },
       *        "color": {
       *            "displayKey": "color",
       *            "queryKey": "colors",
       *            "list": [
       *                "Red",
       *                "Blue",
       *                "Green",
       *                "Yellow",
       *                "Pink"
       *            ]
       *        },
       *        "attributes": {
       *            "queryKey": "attributes",
       *            "attributes": []
       *        },
       *        "_id": "62f5e309f3a7e3dfc73ace45",
       *        "categoryId": "62f5dcf020098408379216ae"
       *    }
       * ],
       * "count": 4,
       * "execTime": 99
       * }
       * }
       **/
    list(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: FilterController;
export default _default;
