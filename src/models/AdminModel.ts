import { model, Schema } from 'mongoose';
import { AdminInterface } from '../interfaces/AdminInterface';

const adminSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        trim: true,
        default: null
    },
    password: {
        type: String,
    },
    name: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    passwordChangedAt: {
        type: Date,
    },
    otp:{
        type:Number,
        default:null
    },
    otp_expiry:{
        type:Date,
        default:null
    }

}, { timestamps: true });

const AdminModel = model<AdminInterface>('Admin', adminSchema);

export default AdminModel;