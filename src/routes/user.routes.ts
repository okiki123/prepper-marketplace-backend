import {Router} from "express";
import {UserController as user} from "../controllers/user.controller";
import {auth} from "../config/auth";

const router = Router();

router.get('/:id', auth, user.getProfile);
router.put('/profile/:id', auth, user.updateProfile);
router.put('/personal-details/:id', auth, user.updatePersonalDetails);
router.put('/password/:id', auth, user.updatePassword);

export default router;
