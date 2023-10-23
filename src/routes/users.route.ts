import {
  createUser,
  getUser,
  getFollowers,
  getFollowings,
  followUser,
  isFollowing,
  unfollowUser,
  updateUser,
  updateImageProfile,
} from "@app-controllers/users.controller";
import upload from "@app-middlewares/multer.middleware";
import { Router } from "express";

const router = Router();

router.post("/", createUser);
router.post("/follow", followUser);
router.post("/unfollow", unfollowUser);
router.post(
  "/:userId/updateImageProfile",
  upload.single("file"),
  updateImageProfile,
);

router.get("/isFollowing/:followingId", isFollowing);

router.get("/:username", getUser);
router.get("/:userId/followers", getFollowers);
router.get("/:userId/followings", getFollowings);
router.get("/:username", getUser);

router.put("/:id", updateUser);

export default router;
