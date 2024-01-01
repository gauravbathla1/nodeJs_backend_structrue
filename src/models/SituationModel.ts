import { Schema, model,AggregatePaginateModel } from 'mongoose';
import * as mongoose from 'mongoose';
import { SituationInterface } from '../interfaces/SituationInterface';
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const situationSchema = new Schema({
    situationName: {
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
    peaceContent:{
        content:{
            type: String,
            default:null,
        },
        animation:{
            type: String,
            default:null,
        }
    },
    flowContent:{
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
situationSchema.plugin(aggregatePaginate);
const SituationModel = model<SituationInterface,AggregatePaginateModel<SituationInterface>>('situation', situationSchema);
export default SituationModel;