import bodyParser from "body-parser";
import mainRouter from './routes/main';
import authRouter from './routes/auth';
import cors from 'cors';
import jwt from 'jsonwebtoken';

import express, { Request, Response } from 'express';
import { NextFunction } from "connect";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.path.includes('/login')) {
    return next();
  }
  console.log(`Attempting token authorization`);
  const token = req.headers.authorization;
  if (!token) {
    return res.json({ err: "No Token" });
  }
  jwt.verify(token, JWT_KEY, (err, decoded) => {
    // Make sure payload and token aren't empty
    if (err) {
      return res.json(err);
    }
    console.log(`Provided token is valid`);
    next();
  });
});

app.use('/', mainRouter);
app.use('/auth', authRouter);

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

export function close(callback?: () => void) {
  server.close(callback);
}

export const JWT_KEY = process.env.JWT_KEY || "AltidEnKeyDetAltidEnSikkerVinder85";
export default app;
