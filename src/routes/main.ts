import express, { Request, Response } from "express";
import DbHandler from "../db/dbhandler";

const router = express.Router()

router.get('/courses', async (req: Request, res: Response) => {
    const search = req.query.search as string;
    const fuzzy = (req.query.fuzzy as string) === "false" ? false : true;
    try {
        const courses = await new DbHandler().getCourses(search, fuzzy);
        res.json(courses);
    } catch (err) {
        res.json(err);
    }
});

router.get('/course', async (req: Request, res: Response) => {
    try {
        const courses = await new DbHandler().testCourse();
        res.json(courses);
    } catch (err) {
        res.json(err);
    }
});

export default router;
