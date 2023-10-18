import {
  createPost,
  getPost,
  getPosts,
} from "@app-controllers/post.controller";
import { Router } from "express";

const router = Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", createPost);

export default router;
