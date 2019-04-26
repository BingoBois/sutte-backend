import express from "express";

const router = express.Router();

router.get("/sut", async (req, res) => {
    res.json({sut: "sut"})
});

export default router;
