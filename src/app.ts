import bodyParser from "body-parser";
import mainRouter from './routes/main';
import authRouter from './routes/auth';
import { Request, Response } from "express";

const express = require('express')
const app = express()
const port = 3000

app.use(bodyParser.json());

app.use('/', mainRouter);
app.use('/auth', authRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
