import { Schema, model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Technique } from '../interfaces/Techniqueinterface';
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const techniqueSchema = new Schema({
    techniqueName: {
        type: String,
        default:null,
    },
    image:{
        type: String,
        default:null,
    },
    categoryName:{
        type: String,
        default:null,
    },
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    instructionContent:{
        content:{
            type: String,
            default:null,
        },
        animation:{
            type: String,
            default:null,
        }
    },
    whyItWorksContent:{
        content:{
            type: String,
            default:null,
        },
        animation:{
            type: String,
            default:null,
        }
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
techniqueSchema.plugin(aggregatePaginate);
const TechniqueModel = model<Technique,mongoose.AggregatePaginateModel<Technique>>('technique', techniqueSchema);
export default TechniqueModel;