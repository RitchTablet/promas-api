import { login, register } from "@app-controllers/auth.controller";
import { Router } from "express";

const router = Router();

router.post("/login", login);
router.post("/register", register);

export default router;
