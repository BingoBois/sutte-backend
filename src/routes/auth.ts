import express, { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { JWT_KEY } from '../app';
import { IAccount } from "../types";
import DbHandler from "../db/dbhandler";
import { hashPass } from "../helpers/hash";

// MAKE ENV VARIABLE
const router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ err: "Missing email and/or password" });
  }
  let account;
  try {
    account = await new DbHandler().getAccount(email);
  } catch (err) {
    return res.json({ err: `No account with email: ${email}` });
  }
  const hashed = hashPass(password);
  if (account.pass !== hashed) {
    return res.json({ err: "Incorrect password" });
  }
  const token = await jwt.sign({ userEmail: email }, JWT_KEY, {
    expiresIn: "1d"
  });
  res.json(token);
});

router.post('/register', async (req: Request, res: Response) => {
  const body = <IAccount>req.body;
  if (!body.email || !body.pass) {
    return res.json({ err: "Missing email and/or password" });
  } else if (!body.name) {
    return res.json({ err: "Missing name" });
  } else if (!body.role) {
    body.role = "teacher";
  }
  try {
    new DbHandler().createAccount(body.email, body.pass, body.role, body.name);
  } catch (err) {
    return res.json({ err });
  }
  res.json({
      message: "Successfully created your account"
  });
});

router.post('/checktoken', (req, res) => {
    const { token } = req.body;
    try {
        jwt.verify(token, JWT_KEY);
        res.json({
            message: "Token is valid"
        });
    } catch (err) {
        console.log(err);
        res.json({
            err: "Token is invalid"
        });
    }
})

export default router;
