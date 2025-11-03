import express from "express";
import { showLogin, showRegister, loginUser, registerUser } from "../controllers/authController.js";

const router = express.Router();

router.get("/login", showLogin);
router.post("/login", loginUser);

router.get("/register", showRegister);
router.post("/register", registerUser);

export default router;



