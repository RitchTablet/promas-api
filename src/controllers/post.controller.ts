import { PostDto } from "@app-dtos/post.dto";
import { SearchDto } from "@app-dtos/search.dto";
import { PostService } from "@app-services/post.service";
import { S3Service } from "@app-services/s3.service";
import { UsersService } from "@app-services/users.service";
import { Request, Response } from "express";

const postService = new PostService();
const userService = new UsersService();
const s3Service = new S3Service("files");

export const getPosts = async (req: Request, res: Response) => {
  const posts = await postService.getPosts();
  return res.status(200).send(posts);
};

export const getAllPostsByUsername = async (req: Request, res: Response) => {
  const { username } = req.params;

  const usernameWithoutFirtchar = username.replace(/^@/, "");
  const posts = await postService.getAllPostsByUsername(
    usernameWithoutFirtchar,
  );

  if (posts == null) return res.sendStatus(400);

  return res.status(200).send(posts);
};

export const getPost = async (req: Request | any, res: Response) => {
  const { id } = req.params;
  const {
    user: { username },
  } = req;

  const post = await postService.getPost(+id, username);

  if (post == null) return res.sendStatus(400);

  return res.status(200).send(post);
};

export const getPostByUsername = async (req: Request, res: Response) => {
  const { id, username } = req.params;

  const usernameWithoutFirtchar = username.replace(/^@/, "");
  const post = await postService.getPostByUsername(
    +id,
    usernameWithoutFirtchar,
  );

  if (post == null) return res.sendStatus(400);

  return res.status(200).send(post);
};

export const createPost = async (req: Request | any, res: Response) => {
  const { file, user } = req;
  const { title, content } = req.body;

  const userExists = await userService.findOneByUsername(user?.username);
  if (!userExists) return res.status(400).send({ message: "User not Exists!" });

  const { Location } = (await s3Service.upload(file)) || {};
  const imgBannerUrl = Location;

  const postDto: PostDto = {
    title,
    content,
    imgBannerUrl,
    user: userExists,
  };

  const postCreated = await postService.createPost(postDto);
  return res.status(201).send(postCreated);
};

export const updatePost = async (req: Request | any, res: Response) => {
  const { file, user } = req;
  const { title, content } = req.body;
  const { id } = req.params;

  const userExists = await userService.findOneByUsername(user?.username);
  if (!userExists) return res.status(400).send({ message: "User not Exists!" });

  let postDto: Partial<PostDto> = { title, content, user: userExists };

  if (file) {
    const { Location } = await s3Service.upload(file);
    postDto.imgBannerUrl = Location;
  }

  const postUpdated = await postService.updatePost(id, postDto);

  return res.status(201).send(postUpdated);
};

export const search = async (req: Request | any, res: Response) => {
  const searchDto: SearchDto = req.query;
  const searchResponse = await postService.search(searchDto);
  return res.status(201).send(searchResponse);
};
