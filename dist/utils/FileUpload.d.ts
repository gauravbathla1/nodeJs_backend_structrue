import { S3 } from 'aws-sdk';
export declare class FileUpload {
    private s3;
    constructor();
    uploadFileOnS3(file: any, directory: string, fileName: string, fileStream?: any): Promise<string>;
    uploadAnimationOnS3(file: any, directory: string, fileName: string, fileStream?: any): Promise<string>;
    removeFileFromS3(fileRemoteName: string): Promise<boolean>;
    copyFilesOnS3(copySource: string, toDirectory: string): Promise<false | import("aws-sdk").Request<S3.CopyObjectOutput, import("aws-sdk").AWSError>>;
    uploadBase64OnS3(base64: string, directory: string, fileName: string): Promise<string>;
}
declare let FileUploadsService: FileUpload;
export default FileUploadsService;
