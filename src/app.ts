import bodyParser from "body-parser";
import mainRouter from './routes/main';
import { Request, Response } from "express";
/*
app.use(bodyParser.json());
app.use("/api", mainRouter);
*/
const express = require('express')
const app = express()
const port = 3001

app.get('/', (req: Request, res: Response) => res.send('Hello World!'))
app.get('/sut', (req: Request, res: Response) => res.send(process.env.SUT ? "SUT IS ACTIVATED" : "NON SUT MODE"))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))