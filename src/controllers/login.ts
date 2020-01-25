import { Request, Response, NextFunction } from "express";
import { UserModel } from "../model/user";
import { body, validationResult } from "express-validator";
import { privateKey } from "../auth/keys/private-key";
import jwt from "jsonwebtoken";

export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  // TODO: fix and sanitize username and password with express-validator

  if (errors.isEmpty()) {
    if (req.body.email && req.body.password) {
      let user = await UserModel.findOne({ email: req.body.email, password: req.body.password });
      // console.log(`Questo è user: ${user}`);
    }
    /** 
    1. The server verifies if the user is legit and responds with a token (JWT) containing the identity of the user.
    2. The token in response is stored locally on the client system, and the user is allowed inside the application.
    3. When the user makes changes to his profile, his profile [data + token] is sent to the server.
    4. The server first checks if the request contains the token (responds with an error if not passed). 
       The token is then verified, once done then the profile data from the payload is checked and respective changes are made to the database.
    5. It's same for all the other actions made by the user.
    6. When the user “logs out” the identification token is destroyed from the local.
    */

    else { return res.status(400).json({ message: "Bad request. Username and password missing." }); }
  } else {
    return res.status(422).json({ errors: errors.array() });
  }
}