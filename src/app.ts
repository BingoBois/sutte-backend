import bodyParser from "body-parser";
import mainRouter from './routes/main';
import authRouter from './routes/auth';
import cors from 'cors';
import jwt from 'jsonwebtoken';

import express, { Request, Response } from 'express';
import { NextFunction } from "connect";
import { Server } from "http";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.path.includes('/login') || req.path.includes('/register')) {
    return next();
  }
  const token = req.headers.authorization;
  if (!token) {
    return res.json({ err: "No Token" });
  }
  jwt.verify(token, JWT_KEY, (err, decoded) => {
    // Make sure payload and token aren't empty
    if (err) {
      return res.json(err);
    }
    next();
  });
});

app.use('/', mainRouter);
app.use('/auth', authRouter);

let server: Server;

export function closeServer(callback?: () => void) {
  server.close((err) => {
    if (callback) {
        callback();
    }
  });
}

export function openServer(callback?: () => void) {
    server = app.listen(port, () => {
        // console.log(`Server is running at port: ${port}`);
        if (callback) {
            callback();
        }
    });
}

openServer();

export const JWT_KEY = process.env.JWT_KEY || "AltidEnKeyDetAltidEnSikkerVinder85";
export default app;
