import { Router } from "express";
const router = Router();

import EchoRoutes from "./echo.route";
import PostRoutes from "./post.route";

router.use("/echo", EchoRoutes);
router.use("/post", PostRoutes);

export default router;
