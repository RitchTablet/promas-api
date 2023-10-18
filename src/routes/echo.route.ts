import { getEchos } from "@app-controllers/echo.controller";
import { Router } from "express";

const router = Router();

router.get("/", getEchos);

export default router;
