import {
  createPost,
  getPost,
  getPosts,
  search,
  updatePost,
  getPostByUsername,
  getAllPostsByUsername,
} from "@app-controllers/post.controller";
import upload from "@app-middlewares/multer.middleware";
import { Router } from "express";

const router = Router();

router.get("/", getPosts);
router.get("/search", search);
router.get("/:id", getPost);
router.get("/allPostsbyUser/:username", getAllPostsByUsername);

router.get("/:username/:id", getPostByUsername);
router.post("/", upload.single("file"), createPost);
router.put("/:id", upload.single("file"), updatePost);

export default router;
