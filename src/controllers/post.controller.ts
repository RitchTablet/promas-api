import { Request, Response } from "express";
import { Post } from "src/entity/post.entity";
import { PostService } from "src/services/post.service";

const postService = new PostService();

export const getPosts = async (req: Request, res: Response) => {
  const posts = await postService.getPosts();
  return res.status(200).send(posts);
};

export const getPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await postService.getPost(+id);

  if (post == null) return res.sendStatus(400);

  return res.status(200).send(post);
};

export const createPost = async (req: Request, res: Response) => {
  const post: Post = req.body;
  const postCreated = await postService.createPost(post);
  return res.status(201).send(postCreated);
};
