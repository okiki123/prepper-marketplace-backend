import {Router} from "express";
import auth from './auth';
import {IndexController} from "../controllers/index.controller";

const router = Router();
router.use('/test', IndexController.run);
router.use('/auth', auth);

export default router
