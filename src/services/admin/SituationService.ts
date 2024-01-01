import SituationModel from "../../models/SituationModel";
import  FileUpload  from "../../utils/FileUpload";

class SituationService{

  async createSituation(payload:any){
    let situation = new SituationModel(payload);
    await situation.save();
    return situation;
  }

  async editSituation(situationId:string,payload:any){
    let situation = await SituationModel.findByIdAndUpdate({_id:situationId},payload,{new:true});
    return situation;
  }

  async deleteSituation(situationId:string){
    let situation = await SituationModel.findByIdAndUpdate({_id:situationId},{isDeleted:true},{new:true});
    return situation;
  }

  async getSituations(options:any){
    let myAggregate =  SituationModel.aggregate([{
        $match:{
            isDeleted:false
        }
    }]);
    let situations =await SituationModel.aggregatePaginate(myAggregate,options);
    return situations;
  };

  async uploadImage(files:any){
    if (files.image) {
     let path = await FileUpload.uploadFileOnS3(files.image,'images',Date.now().toString());
      return path;
    }else if(files.animation){
      let path = await FileUpload.uploadFileOnS3(files.animation,'animations',Date.now().toString());
      return path;
    }
  }
}
const situationAdminService = new SituationService(); // Create an instance of categoryService

export default situationAdminService; 

