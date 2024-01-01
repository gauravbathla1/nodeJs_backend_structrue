import mongoose, { Schema, model,AggregatePaginateModel } from 'mongoose';
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const viewedSchema = new Schema({
    viewBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    situation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'situation'
    },
    technique:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'technique'
    }    
}, { timestamps: true });
viewedSchema.plugin(aggregatePaginate);
const ViewModel = model<any,AggregatePaginateModel<any>>('view', viewedSchema);
export default ViewModel;