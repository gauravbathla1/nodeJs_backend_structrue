"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// import  {IncomingForm } from 'formidable';
const formidable = require('formidable');
class UploadFiles {
    upload(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const form = formidable({ multiples: true });
                // var form = new IncomingForm({multiples:true});
                form.parse(req, (err, fields, files) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        next(err);
                    }
                    else {
                        req.files = files;
                        req.body = fields;
                        next();
                    }
                }));
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = new UploadFiles();
