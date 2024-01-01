import TechniqueModel from "../../models/TechniqueModel";

class SituationService{

  async createTechnique(payload:any){
    let technique = new TechniqueModel(payload);
    await technique.save();
    return technique;
  }

  async editTechnique(techniqueId:string,payload:any){
    let technique = await TechniqueModel.findByIdAndUpdate({_id:techniqueId},payload,{new:true});
    return technique;
  }

  async deleteTechnique(techniqueId:string){
    let technique = TechniqueModel.findByIdAndUpdate({_id:techniqueId},{isDeleted:true},{new:true});
    return technique;
  }

  async getTechniques(options:any){
    let myAggregate = TechniqueModel.aggregate([{
        $match:{
            isDeleted:false
        }
    }]);
    let techniques = TechniqueModel.aggregatePaginate(myAggregate,options);
    return techniques;
  }
}
const situationAdminService = new SituationService(); // Create an instance of categoryService

export default situationAdminService; 

