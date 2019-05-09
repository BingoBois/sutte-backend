import express, { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

// MAKE ENV VARIABLE
const key = process.env.JWT_KEY || "AltidEnKeyDetAltidEnSikkerVinder85";
const router = express.Router();

router.use((req: Request, res: Response, next: NextFunction) => {
  if (req.path === '/login') {
    return next();
  }
  const token = req.headers.authorization;
  if (!token) {
    return res.json({ err: "No Token" });
  }
  jwt.verify(token, key, (err) => {
    // Make sure payload and token aren't empty
    if (err) {
      return res.json(err);
    }
    next();
  });
});

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password){
    return res.json({ err: "Missing email and/or password"});
  }
  const token = await jwt.sign({userEmail: email}, key);
  res.json(token);
});

router.get('/viktokim', (req, res) => {
    res.json({
        message: "Welcome Token User"
    });
});

export default router;
