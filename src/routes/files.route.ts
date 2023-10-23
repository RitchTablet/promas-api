import { uploadFile } from "@app-controllers/files.controller";
import { Router } from "express";
import upload from "@app-middlewares/multer.middleware";

const router = Router();

router.post("/", upload.single("imagen"), uploadFile);

export default router;
