import { NextFunction, Request, Response } from 'express';

export const startRequest = (req: Request, _res: Response, next: NextFunction) => {
  console.log(`Start request to url ${req.url}`);
  next();
};
