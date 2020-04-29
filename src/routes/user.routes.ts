import {Router} from "express";
import {UserController as user} from "../controllers/user.controller";
import {CoursepackController as coursepacks} from "../controllers/coursepack.controller";
import {auth} from "../config/auth";

const router = Router();

// User information
router.get('/:id', auth, user.getProfile);
router.put('/profile/:id', auth, user.updateProfile);
router.put('/personal-details/:id', auth, user.updatePersonalDetails);
router.put('/password/:id', auth, user.updatePassword);

// User Coursepacks
const coursepackBase = '/:id/coursepacks';
router.get(coursepackBase, auth, coursepacks.all);
router.post(coursepackBase, auth, coursepacks.new);
router.put(`${coursepackBase}/:coursepackId`, auth, coursepacks.edit);
router.delete(`${coursepackBase}/:coursepackId`, auth, coursepacks.delete);

export default router;
