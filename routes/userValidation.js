import express from "express";
import {validateUser, populateRequestWithUsername} from "../controllers/userValidation.js";
const router = express.Router();


router.param("username", populateRequestWithUsername);
router.get("/validate/cf/:username", validateUser);


// TODO
// router.get("/validate-CC-profile/:username", validateUser);
// router.get("/validate-LC-profile/:username", validateUser);

export default router;
