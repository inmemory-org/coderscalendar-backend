import { Router } from "express";
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";
import { createParticipants, deleteParticipants, getParticipants, participantsHistory } from "../controllers/participantsController.js";

const router = Router();

router.route("/participants").get(isAuthenticatedUser, authorizeRoles("admin"), getParticipants);
router.route("/participants").post(isAuthenticatedUser, createParticipants);
router.route("/participants/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteParticipants)
router.route("/participants/history").get(isAuthenticatedUser, participantsHistory);

export default router;