
import { ObjectId } from "aws-sdk/clients/codecommit";
import { UserInterface } from "../../interfaces/UserInterface";
import UserModel from "../../models/UserModel";
import ViewModel from "../../models/mostViewdModel";
import SearchModel from "../../models/SearchModel";

class UserService{

     /**
    * @description listing of user
    * @param queryString req query object
    * @params User id of user
    * @returns 
    */

    async getDashBoardData(){
        let totaUsers = await UserModel.countDocuments();
        var currentDate = new Date(); // Get the current date
            // Calculate the date 30 days ago
        currentDate.setDate(currentDate.getDate() - 30);
        let activeUsers = await UserModel.countDocuments({ lastLogin: { $gte: currentDate } });
        let views = await UserService.getTopViews();
        let searches = await SearchModel.aggregate([
          {
            $group: {
              _id: "$searchText",
              count: { $sum: 1 }
            }
          },
          {
            $sort: { count: -1 }
          },
          {
            $limit: 20
          }
        ])
        return {totaUsers, activeUsers,views,searches}
    }

    static async getTopViews() {
      let views = await ViewModel.aggregate([
        {
          '$addFields': {
            'totalView': {
              '$size': '$viewBy'
            }
          }
        }, {
          '$sort': {
            'totalView': -1, 
            'createdAt': -1
          }
        }, {
          '$limit': 20
        }, {
          '$lookup': {
            'from': 'situations', 
            'localField': 'situation', 
            'foreignField': '_id', 
            'as': 'situation'
          }
        }, {
          '$unwind': {
            'path': '$situation', 
            'preserveNullAndEmptyArrays': true
          }
        }, {
          '$lookup': {
            'from': 'techniques', 
            'localField': 'technique', 
            'foreignField': '_id', 
            'as': 'technique'
          }
        }, {
          '$unwind': {
            'path': '$technique', 
            'preserveNullAndEmptyArrays': true
          }
        }, {
          '$project': {
            'name': {
              '$ifNull': [
                '$technique.techniqueName', '$situation.situationName'
              ]
            }, 
            'totalView': 1, 
            'techniqueId': {
              '$cond': {
                'if': '$technique.techniqueName', 
                'then': '$technique._id', 
                'else': null
              }
            }, 
            'situationId': {
              '$cond': {
                'if': '$situation._id', 
                'then': '$situation._id', 
                'else': null
              }
            }
          }
        }
      ]);
      return views;
    }

    async getUserList(options:any){
        let myAggregate = UserModel.aggregate([{
            $match: {
              email: {
                $ne: null
              }
            }
          }])
        let users = await UserModel.aggregatePaginate(myAggregate,options);
        return users;
    }

    async updateUserStatus(id:any){
        let user = await UserModel.findOne({_id:id})
        user.isAccountActive = !user.isAccountActive  
        await user.save();
        return user;
    }

      /**
    * @description get user by id
    * @param id {String} user id for fetching user
    * @returns {Promise<UserInterface>} user data by id
    */

       async findUser(
        id: string | ObjectId
    ): Promise<UserInterface> {
        const userData: UserInterface = await UserModel.findById(id);
        return userData;
    }
}
export default new UserService();