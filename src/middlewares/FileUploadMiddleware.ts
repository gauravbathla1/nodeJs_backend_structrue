import { NextFunction } from 'express';
// import  {IncomingForm } from 'formidable';
const formidable = require('formidable');

import { ReqInterface, ResInterface } from '../interfaces/ReqInterface';
class UploadFiles {
  async upload(req: ReqInterface, res: ResInterface, next: NextFunction) {
   try {
      const form = formidable({ multiples: true });

      // var form = new IncomingForm({multiples:true});
      form.parse(req, async (err: any, fields: any, files: any) => {
        if (err) {
          next(err);
        }
        else {
          req.files = files;
          req.body = fields;
          next();
        }
      });
    } catch (e) {
      next(e)
    }

  }

}

export default new UploadFiles();