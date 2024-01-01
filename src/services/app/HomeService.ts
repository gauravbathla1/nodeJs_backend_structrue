import GlobalHelpeer from "../../helpers/GlobalHelpeer";
import CategoryModel from "../../models/CategoriesModel";
import QuoteModel from "../../models/QuoteModel";
import SearchModel from "../../models/SearchModel";
import SituationModel from "../../models/SituationModel";
import TechniqueModel from "../../models/TechniqueModel";
import ViewModel from "../../models/mostViewdModel";

class HomeServce {
  constructor() {}
  async getDailyQuotes() {
    let quote = await QuoteModel.findOne({isShowing:true});
    console.log(quote);
    return quote;
  }

  async getTechniques(option: Options, search?: string) {
    let baseUrl = process.env.S3_ASSET_URL;
    let myAggregate = TechniqueModel.aggregate([
      {
        $match: {
          isDeleted: false,
          $or: [
            {
              techniqueName: { $regex: search ? search : "", $options: "i" },
            },
            {
              categoryName: { $regex: search ? search : "", $options: "i" },
            },
          ],
        },
      },
      {
        $project: {
          title: "$techniqueName",
          image_url: {
            $concat: [baseUrl, "$image"],
          },
          // categoryName:1,
          // instructionContent:1,
          // whyItWorksContent:1,
        },
      },
    ]);
    let techniques = await TechniqueModel.aggregatePaginate(
      myAggregate,
      option
    );
    if (search?.length > 2) {
      await SearchModel.create({ searchText: search });
    }
    return techniques;
  }

  async getSituations(option: Options, search?: string) {
    let baseUrl = process.env.S3_ASSET_URL;
    let myAggregate = SituationModel.aggregate([
      {
        $match: {
          isDeleted: false,
          $or: [
            {
              situationName: { $regex: search ? search : "", $options: "i" },
            },
            {
              categoryName: { $regex: search ? search : "", $options: "i" },
            },
          ],
        },
      },
      {
        $project: {
          // name: '$situationName',
          // image:1,
          // categoryName:1,
          // peaceContent:1,
          // flowContent:1,
          title: "$situationName",
          image_url: {
            $concat: [baseUrl, "$image"],
          },
        },
      },
    ]);
    let situations = await SituationModel.aggregatePaginate(
      myAggregate,
      option
    );
    if (search?.length > 2) {
      await SearchModel.create({ searchText: search });
    }
    return situations;
  }

  getCategories(option: Options) {
    let myAggregate = CategoryModel.aggregate([
      {
        $match: {
          isDeleted: false,
        },
      },
      {
        $sort:{
          createdAt:-1
        }
      },
      {
        $project: {
          name: 1,
        },
      },
    ]);
    let techniques = CategoryModel.aggregatePaginate(myAggregate, option);
    return techniques;
  }

  async dashBoard() {
    let quotes = await HomeServce.getQuotes();
    let techniques = await HomeServce.getTechnique();
    let deepDive = await HomeServce.getDeepDives();
    let situations = await HomeServce.getSituation();
    return { quotes, techniques, deepDive, situations };
  }

  static async getQuotes() {
    let quotes = await QuoteModel.findOne({isShowing:true});
    return quotes;
  }

  static async getDeepDives() {
    let categories = CategoryModel.aggregate([
      {
        $match: {
          isActive: true,
          isDeleted: false,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $project: {
          name: 1,
        },
      },
      {
        $limit: 12,
      },
    ]);
    return categories;
  }
  static async getSituation() {
    let situation = await SituationModel.aggregate([
      {
        $match: {
          isActive: true,
          isDeleted: false,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $limit: 10,
      },
      {
        $project: {
          name: "$situationName",
        },
      },
    ]);
    return situation;
  }

  static async getTechnique() {
    let technique = await TechniqueModel.aggregate([
      {
        $match: {
          isActive: true,
          isDeleted: false,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $limit: 10,
      },
      {
        $project: {
          name: "$techniqueName",
        },
      },
    ]);
    return technique;
  }

  async getDetails(id: string, type: string,userId: string,title:string){
    type = type?.toLowerCase();
    let baseUrl = process.env.S3_ASSET_URL;
    let data:any = {};
    if (type == "techniques") {
      data = await TechniqueModel.findOne(
        { _id: id },
        {
          name: "$techniqueName",
          instructionContent: {
            content: "$instructionContent.content",
            animation: {
              $concat: [baseUrl, "$instructionContent.animation"],
            },
          },
          whyItWorksContent: {
            content: "$whyItWorksContent.content",
            animation: {
              $concat: [baseUrl, "$whyItWorksContent.animation"],
            },
          },
          image: {
            $concat: [baseUrl, "$image"],
          },
          categoryName: 1,
        }
      ).lean();
      // return data;
    } else if (type == "situations") {
      data = await SituationModel.findOne(
        { _id: id },
        {
          name: "$situationName",
          peaceContent: {
            content: "$peaceContent.content",
            animation: {
              $concat: [baseUrl, "$peaceContent.animation"],
            },
          },
          flowContent: {
            content: "$flowContent.content",
            animation: {
              $concat: [baseUrl, "$flowContent.animation"],
            },
          },
          image: {
            $concat: [baseUrl, "$image"],
          },
          categoryName: 1,
        }
      ).lean();
    }
    if (data) {
      data.shareLink = await GlobalHelpeer.getShareDeepLink(type,id,title);
    }
    await HomeServce.maangeViewRecord(data?.id,type,userId)
    return data;
  };

  static async maangeViewRecord(id:any,type:any,userId:any){
   // let referenceModel;
    let referenceField;
  
    if (type === "techniques") {
    //  referenceModel = TechniqueModel;
      referenceField = "technique";
    } else if (type === "situations") {
     // referenceModel = SituationModel;
      referenceField = "situation";
    } else {
      // Handle the case when 'type' is neither 'technique' nor 'situation'
      throw new Error("Invalid 'type' value");
    }
  
    // Find the record in ViewedModel
    let existingRecord = await ViewModel.findOne({
      [referenceField]: id,
    });
  
    if (!existingRecord) {
      // If the record doesn't exist, create a new record and push 'userId' to the 'viewBy' array
      existingRecord = new ViewModel({
        viewBy: [userId],
        [referenceField]: id,
      });
    } else if (!existingRecord.viewBy.includes(userId)) {
      // If the record exists but 'userId' is not in the 'viewBy' array, push 'userId'
      existingRecord.viewBy.push(userId);
    }
  
    // Save the record
    await existingRecord.save();
  
  };

  public async share(shareType: string,shareId: string){
    let link = await GlobalHelpeer.getShareDeepLink(shareType,shareId,"");
    return link;
  }
}
const UserHomeServce = new HomeServce(); // Create an instance of categoryService
export interface Options {
  page?: number;
  limit: number;
  sort: {
    createdAt: number;
  };
}
export default UserHomeServce;