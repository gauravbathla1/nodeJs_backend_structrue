import CategoryModel from "../../models/CategoriesModel";

class CategoryService{

  async createCategory(categoryName: string){
    let category = new CategoryModel({
      name: categoryName
    });
    await category.save();
    return category;
  }

  async getCategory(options:any){
      let myAggregate = CategoryModel.aggregate([
        {
          '$match': {
            'isActive': true, 
            'isDeleted': false
          }
        }, {
          '$sort': {
            'createdAt': -1
          }
        }, 
         {
          '$lookup': {
            'from': 'situations', 
            'localField': '_id', 
            'let': {
              'catId': '$_id'
            }, 
            'foreignField': 'categoryId', 
            'as': 'situation', 
            'pipeline': [
              {
                '$match': {
                  'isDeleted': false
                }
              }
            ]
          }
        }, {
          '$lookup': {
            'from': 'techniques', 
            'localField': '_id', 
            'let': {
              'catId': '$_id'
            }, 
            'foreignField': 'categoryId', 
            'as': 'techniques', 
            'pipeline': [
              {
                '$match': {
                  'isDeleted': false
                }
              }
            ]
          }
        }, {
          '$addFields': {
            'total': {
              '$sum': [
                {
                  '$size': '$techniques'
                }, {
                  '$size': '$situation'
                }
              ]
            }
          }
        }, {
          '$unset': [
            'situation', 'techniques'
          ]
        }
      ]);
    let categories = CategoryModel.aggregatePaginate(myAggregate,options);
    return categories;
  }

  async getAllCategories(){
    let categories = CategoryModel.find({isDeleted:false}).sort({name:1}).select('name')
    return categories;
  }

  async editCategory(categoryId:string,categoryName: string){
    let category = CategoryModel.findByIdAndUpdate({_id:categoryId},{name:categoryName},{new:true});
    return category;
  }

  async deleteCategory(categoryId:string){
    let category = CategoryModel.findByIdAndUpdate({_id:categoryId},{isDeleted:true},{new:true});
    return category;
  }

}
const categoryAdminService = new CategoryService(); // Create an instance of categoryService

export default categoryAdminService; 
// export default new SpeakerService();

