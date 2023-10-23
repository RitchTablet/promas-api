import { S3Service } from "@app-services/s3.service";
import { UsersService } from "@app-services/users.service";
import { Request, Response } from "express";

const usersService = new UsersService();
const s3Service = new S3Service(process.env.BUCKET_NAME);

export const createUser = async (req: Request | any, res: Response) => {
  const user = req.body;
  const userCreated = await usersService.createUser(user);
  return res.status(201).send(userCreated);
};

export const updateUser = async (req: Request | any, res: Response) => {
  const { id } = req.params;
  const user = req.body;

  const userCreated = await usersService.updateUser(id, user);
  return res.status(201).send(userCreated);
};

export const updateImageProfile = async (req: Request | any, res: Response) => {
  const { userId } = req.params;
  const { file } = req;

  const user = await usersService.findOneById(userId);
  if (!user) return res.status(400).send({ message: "User not Exists!" });

  if (file) {
    const { Location } = await s3Service.upload(file);
    user.profileImageUrl = Location;
    const userSaved = await usersService.save(user);
    return res.status(200).send(userSaved);
  }

  return res.status(400).send("Cannot upload file!");
};

export const getUser = async (req: Request | any, res: Response) => {
  const { username } = req.params;
  const usernameWithoutFirtchar = username.replace(/^@/, "");
  const userCreated = await usersService.findOneByUsername(
    usernameWithoutFirtchar,
  );
  return res.status(200).send(userCreated);
};

export const followUser = async (req: Request | any, res: Response) => {
  const { followingId } = req.body;
  const {
    user: { id },
  } = req;

  const follow = await usersService.followUser(id, followingId);

  return res.status(201).send(follow);
};

export const unfollowUser = async (req: Request | any, res: Response) => {
  const { followingId } = req.body;
  const {
    user: { id },
  } = req;

  const message = await usersService.unfollowUser(id, followingId);

  return res.status(201).send({ message });
};

export const isFollowing = async (req: Request | any, res: Response) => {
  const { followingId } = req.params;
  const {
    user: { id },
  } = req;

  const follow = await usersService.isFollowing(id, +followingId);

  return res.status(201).send(follow);
};

export const getFollowers = async (req: Request | any, res: Response) => {
  const { userId } = req.params;
  const followers = await usersService.getFollowers(userId);
  return res.status(201).send(followers);
};

export const getFollowings = async (req: Request | any, res: Response) => {
  const { userId } = req.params;
  const followings = await usersService.getFollowings(userId);
  return res.status(201).send(followings);
};
