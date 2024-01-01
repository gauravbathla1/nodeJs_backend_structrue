import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
declare class FilterController {
    /**
       * @api {get} /api/v1/app/filter/list-by-id:categoryId Filter List
       * @apiHeader {String} App-Version Version Code 1.0.0.
       * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
       * @apiVersion 1.0.0
       * @apiName filter-list-by-id
       * @apiGroup App-Filter
       *
       * @apiDescription pass categoryId as params
       * @apiSuccessExample {json} Success-Response-1:
       *  {
       *        "status": 200,
       *        "statusText": "SUCCESS",
       *        "message": "Filter list",
       *        "data": {
       *            "filter": {
       *                "subcategories": {
       *                    "displayKey": "product categories",
       *                    "queryKey": "subcategory",
       *                    "list": [
       *                        {
       *                            "name": "Kid's crafts",
       *                            "_id": "62dfd43efb89c4b45de44f18"
       *                        }
       *                    ]
       *                },
       *                "brands": {
       *                    "displayKey": "brands",
       *                    "queryKey": "brands",
       *                    "list": [
       *                        {
       *                            "name": "My Brnad",
       *                            "_id": "62f20e7b462b16cab5e16fbf"
       *                        }
       *                    ]
       *                },
       *                "price": {
       *                    "displayKey": "price",
       *                    "queryKey": "price",
       *                    "minPrice": 0,
       *                    "maxPrice": 450000
       *                },
       *                "color": {
       *                    "displayKey": "color",
       *                    "queryKey": "colors",
       *                    "list": [
       *                        "red",
       *                        "blue"
       *                    ]
       *                },
       *                "attributes": {
       *                    "queryKey": "attributes",
       *                    "attributes": [
       *                        {
       *                            "displayKey": "sizes",
       *                            "queryKey": "sizes",
       *                            "list": [
       *                                "x",
       *                                "M",
       *                                "XL",
       *                                "XXL"
       *                            ],
       *                            "_id": "62f2421ddf9b18de4e98c587"
       *                        },
       *                        {
       *                            "displayKey": "fabric",
       *                            "queryKey": "fabric",
       *                            "list": [
       *                                "cotten",
       *                                "nylon"
       *                            ],
       *                            "_id": "62f2421ddf9b18de4e98c588"
       *                        },
       *                        {
       *                            "displayKey": "patters",
       *                            "queryKey": "patters",
       *                            "list": [
       *                                "stripped",
       *                                "regular"
       *                            ],
       *                            "_id": "62f2421ddf9b18de4e98c589"
       *                        }
       *                    ]
       *                },
       *                "_id": "62f24134f340f9f48352e9a3",
       *                "categoryId": "62df8560920908884958dd49",
       *                "__v": 3
       *            },
       *            "execTime": 111
       *        }
       *    }
       *
       */
    getFilterById(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    filterModified(filter: any): any;
    /**
       * @api {get} /api/v1/app/filter/list-by-slug:categorySlug Filter List By Slug for web
       * @apiHeader {String} App-Version Version Code 1.0.0.
       * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
       * @apiVersion 1.0.0
       * @apiName filter-list-by-slug
       * @apiGroup App-Filter
       *
       * @apiDescription pass categorySlug as params
       * @apiSuccessExample {json} Success-Response-1:
       *  {
       *        "status": 200,
       *        "statusText": "SUCCESS",
       *        "message": "Filter list",
       *        "data": {
       *            "filter": {
       *                "subcategories": {
       *                    "displayKey": "product categories",
       *                    "queryKey": "subcategory",
       *                    "list": [
       *                        {
       *                            "name": "Kid's crafts",
       *                            "_id": "62dfd43efb89c4b45de44f18"
       *                        }
       *                    ]
       *                },
       *                "brands": {
       *                    "displayKey": "brands",
       *                    "queryKey": "brands",
       *                    "list": [
       *                        {
       *                            "name": "My Brnad",
       *                            "_id": "62f20e7b462b16cab5e16fbf"
       *                        }
       *                    ]
       *                },
       *                "price": {
       *                    "displayKey": "price",
       *                    "queryKey": "price",
       *                    "minPrice": 0,
       *                    "maxPrice": 450000
       *                },
       *                "color": {
       *                    "displayKey": "color",
       *                    "queryKey": "colors",
       *                    "list": [
       *                        "red",
       *                        "blue"
       *                    ]
       *                },
       *                "attributes": {
       *                    "queryKey": "attributes",
       *                    "attributes": [
       *                        {
       *                            "displayKey": "sizes",
       *                            "queryKey": "sizes",
       *                            "list": [
       *                                "x",
       *                                "M",
       *                                "XL",
       *                                "XXL"
       *                            ],
       *                            "_id": "62f2421ddf9b18de4e98c587"
       *                        },
       *                        {
       *                            "displayKey": "fabric",
       *                            "queryKey": "fabric",
       *                            "list": [
       *                                "cotten",
       *                                "nylon"
       *                            ],
       *                            "_id": "62f2421ddf9b18de4e98c588"
       *                        },
       *                        {
       *                            "displayKey": "patters",
       *                            "queryKey": "patters",
       *                            "list": [
       *                                "stripped",
       *                                "regular"
       *                            ],
       *                            "_id": "62f2421ddf9b18de4e98c589"
       *                        }
       *                    ]
       *                },
       *                "_id": "62f24134f340f9f48352e9a3",
       *                "categoryId": "62df8560920908884958dd49",
       *                "__v": 3
       *            },
       *            "execTime": 111
       *        }
       *    }
       *
       */
    getFilterBySlug(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
       * @api {post} /api/v1/app/filter/breadcrumb Breadcrumb List
       * @apiHeader {String} App-Version Version Code 1.0.0.
       * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
       * @apiVersion 1.0.0
       * @apiName breadcrumb
       * @apiGroup App-Filter
       *
       * @apiParam {String} [categorySlug] categorySlug
       * @apiParam {String} [subcategorySlug] subcategorySlug
       * @apiParamExample {json} Request-Body:
       *     {
       *         "subcategorySlug": "women-shoes"
       *     }
       *
       * @apiParamExample {json} Request-body 2
       * {
       *         "productSlug": "lece-maxi-dress-adjustable-shoulder-strap-button--63087b2f224cb585fce762a6"
       *     }
       *
       * @apiSuccessExample {json} Success-Response-1:
       * {
        *        "status": 200,
        *        "statusText": "SUCCESS",
        *        "message": "Breadcrumb list",
        *        "data": {
        *            "breadcrumb": [
        *                {
        *                    "name": "women's fashion",
        *                    "slug": "women's-fashion",
        *                    "queryKey": "categorySlug"
        *                },
        *                {
        *                    "name": "women shoes",
        *                    "slug": "women-shoes",
        *                    "queryKey": "subcategorySlug"
        *                }
        *            ],
        *            "execTime": 96
        *        }
        *    }
        *
        * @apiSuccessExample {json} Success-Response-2:
        * {
        *        "status": 200,
        *        "statusText": "SUCCESS",
        *        "message": "Breadcrumb list",
        *        "data": {
        *            "breadcrumb": [
        *                {
        *                    "name": "women's fashion",
        *                    "slug": "women's-fashion",
        *                    "queryKey": "categorySlug"
        *                },
        *                {
        *                    "name": "women's top",
        *                    "slug": "women's-top",
        *                    "queryKey": "subcategorySlug"
        *                },
        *                {
        *                    "name": "lece maxi dress adjustable shoulder strap button ",
        *                    "slug": "lece-maxi-dress-adjustable-shoulder-strap-button--63087b2f224cb585fce762a6",
        *                    "queryKey": "productSlug"
        *                }
        *            ],
        *            "execTime": 41
        *        }
        *    }
       *
       *
       * */
    getBreadCamp(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: FilterController;
export default _default;
