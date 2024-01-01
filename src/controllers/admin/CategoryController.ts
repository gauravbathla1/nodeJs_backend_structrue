import { NextFunction } from "express";
import ResponseHelper from "../../helpers/ResponseHelper";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
import CategoryService from "../../services/admin/CategoryService";

class CategoryController{

    async createCategory(req:ReqInterface, res:ResInterface,next:NextFunction){
        try {
            let {name} = req.body;
            const category = await CategoryService.createCategory(name);
            return ResponseHelper.created(res,"Category Added successfully",{category});
        } catch (error) {
            next(error);
        }
    };

    async getCategory(req:ReqInterface, res:ResInterface,next:NextFunction){
        try {
            let page = req.query.page || 1;
            let options = {
              page: page || 1,
              limit: 10,
              sort: {
                createdAt: -1,
              },
            };
            const category = await CategoryService.getCategory(options);
            return ResponseHelper.created(res,"Category Added successfully",{category});
        } catch (error) {
            next(error);
        }
    };

    async getAllCategory(req:ReqInterface, res:ResInterface, next:NextFunction){
        try {
            const category = await CategoryService.getAllCategories();
            return ResponseHelper.created(res,"Category Added successfully",{category});
        } catch (error) {
            next(error);
        }
    }

    async editCategory(req:ReqInterface,res:ResInterface,next:NextFunction){
        try {
            let categoryId = req.params?.id
            let {name} = req.body;
            const category = await CategoryService.editCategory(categoryId,name);
            return ResponseHelper.ok(res,"Category Updated successfully",{category});
        } catch (error) {
            next(error);
        }
    }


    async deleteCategory(req:ReqInterface,res:ResInterface,next:NextFunction){
        try {
            let categoryId = req.params?.id
            const category = await CategoryService.deleteCategory(categoryId);
            return ResponseHelper.ok(res,"Category Deleted successfully",{category});
        } catch (error) {
            next(error);
        }
    }

};
export default new CategoryController();