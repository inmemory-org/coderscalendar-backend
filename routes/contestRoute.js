import { Router } from "express";
import { getAllContests, createContest, updateContest, deleteContest } from "../controllers/contestController.js";
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";

const router = Router();

router.route("/contests").get(getAllContests);
router.route("/contest/new").post(isAuthenticatedUser, authorizeRoles("admin"), createContest);
router.route("/contest/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateContest).delete(isAuthenticatedUser, authorizeRoles("admin"), deleteContest);

export default router;