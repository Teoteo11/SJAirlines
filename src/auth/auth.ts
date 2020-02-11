import jwt from 'jsonwebtoken';
// import { publicKey } from './keys/public-key';
import { Request, Response, NextFunction } from 'express';
import { privateKey } from './keys/private-key';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  jwt.verify(req.headers.authorization as string, privateKey, (err: Error) => {
    err ? res.status(401).send({ message: "Non autorizzato", err }) : next();
  });
}