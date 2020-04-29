import {Router} from "express";
import {CourseController as courses} from "../controllers/course.controller";
import {auth} from "../config/auth";

const router = Router();

const courseBase = `/:id/courses`;
router.get(courseBase, auth, courses.all);
router.post(courseBase, auth, courses.new);
router.put(`${courseBase}/:courseId`, auth, courses.edit);
router.delete(`${courseBase}/:courseId`, auth, courses.delete);

export default router;
