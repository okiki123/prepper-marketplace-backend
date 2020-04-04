import {Router} from "express";
import auth from './auth.routes';
import user from './user.routes';
import {IndexController} from "../controllers/index.controller";

const router = Router();
router.use('/test', IndexController.run);
router.use('/auth', auth);
router.use('/user', user);

export default router
