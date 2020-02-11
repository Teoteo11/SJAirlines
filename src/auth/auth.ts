import jwt from 'jsonwebtoken';
import { publicKey } from './keys/public-key';
import { Request, Response, NextFunction } from 'express';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  jwt.verify(req.headers.authorization as string, publicKey, (err: Error) => {
    err ? res.status(401).send({ message: "Ciao" }) : next();
  });
}