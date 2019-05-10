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

router.post('/suggestcourse', async (req: Request, res: Response) => {
    let {name, description, active, fk_suggestedBy} = req.body 

    if(!name || name.isEmpty){
        return res.json({message: "Missing Course Name!"})
    } else if (!active && active !== false) {
       active = false
    } 
    try{
        const suggestCourse = await new DbHandler().createCourse(name, description, active, fk_suggestedBy)
        res.json({message: 'Course send'})
    } catch (err){
        res.json(err)
    }
    
})

router.delete("/deletecourse", async(req: Request, res: Response) => {
    let {courseID} = req.body

    if(courseID === null || courseID === ""){
        return res.json({message: "Missing CourseID!"})
    } 

    try{
        const deleteCourse = await new DbHandler().deleteCourse(courseID)
        res.json({message: `Course id ${courseID} deleted!`})
    } catch (err){
        res.json(err)
    }
})

export default router;
