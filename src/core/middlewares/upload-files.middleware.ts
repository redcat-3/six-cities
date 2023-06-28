import { NextFunction, Request, Response } from 'express';
import { nanoid } from 'nanoid';
import multer, { diskStorage } from 'multer';
import mime from 'mime-types';
import { MiddlewareInterface } from './middleware.interface.js';
import { COUNT_OF_IMAGES } from '../../modules/offer/offer.constant.js';
import HttpError from '../errors/http-error.js';
import { StatusCodes } from 'http-status-codes';

export class UploadFilesMiddleware implements MiddlewareInterface {
  constructor(private uploadDirectory: string, private fieldName: string) {}

  public async execute(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const storage = diskStorage({
      destination: this.uploadDirectory,
      filename: (_req, file, callback) => {
        const extension = mime.extension(file.mimetype);
        const filename = nanoid();
        console.log(file);
        callback(null, `${filename}.${extension}`);
      },
    });
    console.log(`UploadFilesMiddleware 24: ${this.fieldName}`);

    const fileUploadMiddleware = multer({
      storage: storage,
      fileFilter: function (_req, file, cb){
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test((file.originalname).toLowerCase());
        if (mimetype && extname) {
          return cb(null, true);
        }
        cb(new HttpError(
          StatusCodes.BAD_REQUEST,
          'File should be end with any one of the following extensions: jpg, jpeg, png'));
      }
    }).array(
      this.fieldName,
      COUNT_OF_IMAGES
    );
    fileUploadMiddleware(req, res, next);
  }
}
