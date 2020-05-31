import {Router} from "express";
import {CourseController as courses} from "../controllers/course.controller";
import {ConversationController as conversations} from "../controllers/conversation.controller";
import {auth} from "../config/auth";
import formidable from "express-formidable";

const router = Router();

const ConversationBase = `/:id/conversations`;
router.get(ConversationBase, auth, conversations.all);
router.post(`${ConversationBase}`, auth, conversations.new);
router.post(`${ConversationBase}/image`, auth, formidable(), conversations.newImage);
router.put(`${ConversationBase}/:conversationId`, auth, conversations.edit);
router.put(`${ConversationBase}/:conversationId/image`, formidable(), auth, conversations.editImage);
router.put(`${ConversationBase}/:courseId`, auth, courses.edit);
router.delete(`${ConversationBase}/:conversationId`, auth, conversations.delete);

export default router;
