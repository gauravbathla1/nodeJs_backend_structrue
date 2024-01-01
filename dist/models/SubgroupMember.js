"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const subgroupMemberSchema = new mongoose_1.Schema({
    subgroupId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'subgroup'
    },
    groupId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'group'
    },
    memberId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user'
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});
const SubgroupMemberModel = (0, mongoose_1.model)('subgroupMember', subgroupMemberSchema);
exports.default = SubgroupMemberModel;
