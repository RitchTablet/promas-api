import { Router } from "express";
const router = Router();

import { authenticate } from "@app-middlewares/authenticate";

import AuthRoute from "./auth.route";
import EchoRoutes from "./echo.route";
import FilesRoute from "./files.route";
import PostRoutes from "./post.route";
import UsersRoute from "./users.route";

router.use("/echo", EchoRoutes);
router.use("/post", authenticate, PostRoutes);
router.use("/upload", authenticate, FilesRoute);
router.use("/users", authenticate, UsersRoute);
router.use("/auth", AuthRoute);

export default router;
