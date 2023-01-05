import { Router } from "express";
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";
import { deleteRanking, getRanking } from "../controllers/rankingController.js";

const router = Router();

router.route("/ranking/:id").get(getRanking);
router.route("/ranking/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteRanking)


export default router;