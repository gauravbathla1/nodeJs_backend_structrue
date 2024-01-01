
import { AggregatePaginateModel, Schema, model } from 'mongoose';
import { categoryInterface } from '../interfaces/CategoryInterface';
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');


const categorySchema = new Schema({
    name: {
        type: String,
        default:null,
    },
    isActive: {
        type: Boolean,
        default:true,
    },
    isDeleted:{
        type: Boolean,
        default:false,
    }    
}, { timestamps: true });
categorySchema.plugin(aggregatePaginate);
const CategoryModel = model<categoryInterface,AggregatePaginateModel<categoryInterface>>('category', categorySchema);
export default CategoryModel;