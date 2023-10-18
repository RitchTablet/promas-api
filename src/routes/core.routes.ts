import { Router } from "express";
const router = Router();

import EchoRoutes from "./echo.route";

router.use("/echo", EchoRoutes);

export default router;
