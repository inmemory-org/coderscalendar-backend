import express from "express";
import { get_CF_contest_standings } from "../controllers/contestRanking.js";
const router = express.Router();

router.get("/contest/:contestID/ranking", get_CF_contest_standings);

export default router;
