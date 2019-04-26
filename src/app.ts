import bodyParser from "body-parser";
import express from "express";
import mainRouter from './routes/main'

const app = express();

app.use(bodyParser.json());
app.use("api", mainRouter);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})