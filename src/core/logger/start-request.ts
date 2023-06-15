import debug from 'debug';
import { NextFunction, Request, Response } from 'express';

const log = debug('app:start-request');

export const startRequest = (req: Request, _re: Response, next: NextFunction) => {
  log(`Start request to url ${req.url}`);
  next();
};
