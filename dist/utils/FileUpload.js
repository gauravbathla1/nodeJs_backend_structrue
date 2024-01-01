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
exports.FileUpload = void 0;
const fs = require("fs");
const aws_sdk_1 = require("aws-sdk");
const Env_1 = require("../environments/Env");
class FileUpload {
    constructor() {
        this.s3 = new aws_sdk_1.S3({
            accessKeyId: (0, Env_1.env)().awsAccessKey,
            secretAccessKey: (0, Env_1.env)().awsSecretKey,
            region: (0, Env_1.env)().awsRegion
        });
    }
    uploadFileOnS3(file, directory, fileName, fileStream) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const s3 = new S3({
                //   accessKeyId: env().awsRegion
                // });
                const file_stream = fileStream ? fileStream : fs.readFileSync(file.filepath);
                let fileExtension = fileName.includes('.')
                    ? fileName.split('.').pop()
                    : file.mimetype.split('/').pop();
                console.log(file.mimetype, 'file.mimetype');
                fileExtension = fileExtension.replace('+xml', '');
                const fileRemoteName = `${directory}/${fileName}.${fileExtension}`;
                // const fileRemoteName = `${directory}/${fileName}`;
                return yield this.s3.putObject({
                    Bucket: (0, Env_1.env)().s3Bucket,
                    Body: file_stream,
                    ContentType: file.mimetype,
                    Key: fileRemoteName,
                    ACL: 'public-read'
                }).promise()
                    .then(res => {
                    console.log(res, "res----");
                    console.log(fileRemoteName);
                    return fileRemoteName;
                });
            }
            catch (err) {
                console.log('failed:', err);
                return '';
            }
        });
    }
    uploadAnimationOnS3(file, directory, fileName, fileStream) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const s3 = new S3({
                //   accessKeyId: env().awsRegion
                // });
                const file_stream = fileStream ? fileStream : fs.readFileSync(file.filepath);
                const fileRemoteName = `${directory}/${fileName}`;
                return yield this.s3.putObject({
                    Bucket: (0, Env_1.env)().s3Bucket,
                    Body: file_stream,
                    ContentType: file.mimetype,
                    Key: fileRemoteName,
                    ACL: 'public-read'
                }).promise()
                    .then(res => {
                    console.log(res);
                    return fileRemoteName;
                });
            }
            catch (err) {
                console.log('failed:', err);
                return '';
            }
        });
    }
    removeFileFromS3(fileRemoteName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(fileRemoteName);
                const params = {
                    Bucket: (0, Env_1.env)().s3Bucket,
                    Key: fileRemoteName
                };
                yield this.s3.deleteObject(params);
                return true;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    copyFilesOnS3(copySource, toDirectory) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const s3 = new S3({
                //   accessKeyId: env().awsAccessKey,
                //   secretAccessKey: env().awsAccessKey,
                //   region: env().awsRegion
                // });
                const params = {
                    Bucket: (0, Env_1.env)().s3Bucket,
                    CopySource: copySource,
                    Key: toDirectory
                };
                const newUrl = yield this.s3.copyObject(params);
                return newUrl;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    uploadBase64OnS3(base64, directory, fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const s3 = new S3({
                //   accessKeyId: env().awsAccessKey,
                //   secretAccessKey: env().awsAccessKey,
                //   region: env().awsRegion
                // });
                const fileRemoteName = `${directory}/${fileName}`;
                console.log(fileRemoteName);
                // console.log(base64);
                // const buffer = Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64');
                // const buffer = Buffer.from(base64,'base64');
                const s3Object = {
                    Bucket: (0, Env_1.env)().s3Bucket,
                    Body: base64,
                    Key: fileRemoteName,
                    // ContentEncoding: 'base64',
                    ContentType: 'image/png',
                    ACL: 'public-read'
                };
                // let options = { partSize: 5 * 1024 * 1024, queueSize: 2 };
                return yield this.s3.putObject(s3Object).promise()
                    .then(res => {
                    console.log(res);
                    return fileRemoteName;
                });
            }
            catch (error) {
                console.log(error);
                return '';
            }
        });
    }
}
exports.FileUpload = FileUpload;
;
let FileUploadsService = new FileUpload();
exports.default = FileUploadsService;
