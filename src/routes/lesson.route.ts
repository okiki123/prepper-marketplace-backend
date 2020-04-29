import {Router} from "express";
import {LessonController as lessons} from "../controllers/lesson.controller";
import {auth} from "../config/auth";

const router = Router();

const lessonBase = `/:id/lessons`;
router.get(lessonBase, auth, lessons.all);
router.post(lessonBase, auth, lessons.new);
router.put(`${lessonBase}/:lessonId`, auth, lessons.edit);
router.delete(`${lessonBase}/:lessonId`, auth, lessons.delete);

export default router;
