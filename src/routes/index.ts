import {Router} from "express";
import auth from './auth.routes';
import user from './user.routes';
import course from './course.routes';
import lesson from './lesson.route';
import {IndexController} from "../controllers/index.controller";

const router = Router();
router.use('/test', IndexController.run);
router.use('/auth', auth);
router.use('/user', user);
router.use('/coursepacks', course);
router.use('/courses', lesson);

export default router
