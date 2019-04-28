import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
    res.send(process.env.MYSQL_STR ? "PROD" : "DEV");
});

router.get("/sut", async (req, res) => {
    res.json({sut: "sut"})
});

export default router;
