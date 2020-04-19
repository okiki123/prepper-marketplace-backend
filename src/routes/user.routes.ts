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

// User Courses
const base = '/:id/coursepacks';
router.get(base, auth, coursepacks.all);
router.post(base, auth, coursepacks.new);
router.put(`${base}/:coursepackId`, coursepacks.edit);
router.delete(`${base}/:coursepackId`, coursepacks.delete);

export default router;
