import { Schema, model } from 'mongoose';
import { LOG_EXEC_STATUS } from './LogTypeConstant';
import { LogInterface } from './LogInterface';

const logSchema = new Schema({
    execStatus: {
        type: Number,
        enum: Object.values(LOG_EXEC_STATUS),
        default: LOG_EXEC_STATUS.success
    },
    api: {
        type: String
    },
    user: {
        type: String
    },
    session: {
        type: String
    },
    method: {
        type: String,
    },
    status: {
        type: Number,
    },
    message: {
        type: String,
    },
    execTime: {
        type: Number // time in ms
    },
    data: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

logSchema.index({ api: 1 });

const LogModel = model<LogInterface>('Log', logSchema);

export default LogModel;