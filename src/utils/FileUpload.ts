import * as fs from 'fs';
import { S3 } from 'aws-sdk';
import { env } from '../environments/Env';

export class FileUpload {
  private s3: S3;

  constructor() {
    this.s3 = new S3({
      accessKeyId: env().awsAccessKey,
      secretAccessKey: env().awsSecretKey,
      region: env().awsRegion
    });
  }

   async uploadFileOnS3(
    file: any,
    directory: string,
    fileName: string,
    fileStream?: any
  ): Promise<string> {
    try {
      // const s3 = new S3({
      //   accessKeyId: env().awsRegion
      // });
      const file_stream = fileStream ? fileStream : fs.readFileSync(file.filepath)
      let fileExtension = fileName.includes('.')
      ? fileName.split('.').pop()
      : file.mimetype.split('/').pop();
      console.log(file.mimetype,'file.mimetype');
      fileExtension = fileExtension.replace('+xml', '');
    const fileRemoteName = `${directory}/${fileName}.${fileExtension}`;

      // const fileRemoteName = `${directory}/${fileName}`;
      return await this.s3.putObject({
        Bucket: env().s3Bucket,
        Body: file_stream,
        ContentType: file.mimetype,
        Key: fileRemoteName,
        ACL: 'public-read'
      }).promise()
        .then(res => {
          console.log(res,"res----");
          console.log(fileRemoteName);
          
          return fileRemoteName;
        });
    } catch (err) {
      console.log('failed:', err);
      return '';
    }
  }

  async uploadAnimationOnS3(
    file: any,
    directory: string,
    fileName: string,
    fileStream?: any
  ): Promise<string> {
    try {
      // const s3 = new S3({
      //   accessKeyId: env().awsRegion
      // });
      const file_stream = fileStream ? fileStream : fs.readFileSync(file.filepath)
      const fileRemoteName = `${directory}/${fileName}`;
      return await this.s3.putObject({
        Bucket: env().s3Bucket,
        Body: file_stream,
        ContentType: file.mimetype,
        Key: fileRemoteName,
        ACL: 'public-read'
      }).promise()
        .then(res => {
          console.log(res);
          return fileRemoteName;
        });
    } catch (err) {
      console.log('failed:', err);
      return '';
    }
  }


  async removeFileFromS3(fileRemoteName: string): Promise<boolean> {
    try {

      console.log(fileRemoteName);
      const params = {
        Bucket: env().s3Bucket,
        Key: fileRemoteName
      }
      await this.s3.deleteObject(params);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async copyFilesOnS3(
    copySource: string,
    toDirectory: string
  ) {
    try {
      // const s3 = new S3({
      //   accessKeyId: env().awsAccessKey,
      //   secretAccessKey: env().awsAccessKey,
      //   region: env().awsRegion
      // });

      const params = {
        Bucket: env().s3Bucket,
        CopySource: copySource,
        Key: toDirectory
      }
      const newUrl = await this.s3.copyObject(params);
      return newUrl;
    } catch (error) {
      console.log(error);
      return false;
    }
  }


  async uploadBase64OnS3(
    base64: string,
    directory: string,
    fileName: string
  ) {
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
        Bucket: env().s3Bucket,
        Body: base64,
        Key: fileRemoteName,
        // ContentEncoding: 'base64',
        ContentType: 'image/png',
        ACL: 'public-read'
      }
      // let options = { partSize: 5 * 1024 * 1024, queueSize: 2 };
      return await this.s3.putObject(s3Object).promise()
        .then(res => {
          console.log(res);
          return fileRemoteName;
        });

    } catch (error) {
      console.log(error);
      return '';
    }
  }

};
let FileUploadsService = new FileUpload();
export default FileUploadsService;
