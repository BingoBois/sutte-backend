import express, { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

// MAKE ENV VARIABLE
const key = "djghhhhuuwiwuewieuwieuriwu";
const router = express.Router()

router.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.path);
  if (req.path !== '/login') {
    const token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : "";
    if (!token) {
      res.json({ err: "No Token" });
    }
    else {
      jwt.verify(token, key, (err, payload) => {
        // Make sure payload and token aren't empty
        if (err) {
          res.json(err);
        }
        if (payload) {
          next();
        }
      });
    }
  }
  else{
    next();
  }
});

router.post('/login', async (req: Request, res: Response) => {
  console.log(req.body);
  const { email, password } = req.body;
  console.log(email);
  if (email && password){
    const token = await jwt.sign({}, key);
    res.json(token);
  }
  else{
    res.json({ err: "Missing email and/or password"});
  }
});

export default router;
