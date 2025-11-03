import express from "express";
import { apiRegisterUser, apiLoginUser, apiGetUsers } from "../../controllers/api/authController.js";

const router = express.Router();

router.post("/register", apiRegisterUser);
router.post("/login", apiLoginUser);
router.get("/", apiGetUsers); // اختياري، لجلب كل المستخدمين

export default router;
