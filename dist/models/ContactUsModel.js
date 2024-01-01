"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// name , compony,jobtitle , isAttend , isSponser
const mongoose_1 = require("mongoose");
const contactUsForm = new mongoose_1.Schema({
    name: {
        type: String,
        default: null
    },
    email: {
        type: String,
        default: null
    },
    company: {
        type: String,
        default: null
    },
    title: {
        type: String,
        default: null
    },
    isAttend: {
        type: Boolean,
        default: false
    },
    isSponser: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
const ContactModel = (0, mongoose_1.model)('contact', contactUsForm);
exports.default = ContactModel;
