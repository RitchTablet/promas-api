import { SearchDto } from "@app-dtos/search.dto";
import { myDataSource } from "@app/app-data-source";
import { PostDto } from "@app/dtos/post.dto";
import { Post } from "@app/entity/post.entity";
import { ILike, Repository } from "typeorm";

export class PostService {
  postRepository: Repository<Post>;

  constructor() {
    this.postRepository = myDataSource.getRepository("Post");
  }

  async createPost(postDto: PostDto) {
    const postCreated = this.postRepository.create(postDto);
    const post = await this.postRepository.save<Post>(postCreated);
    return post.getOnlyPostData();
  }

  async getPosts() {
    const posts = await this.postRepository.find({ relations: ["user"] });
    return posts.map((post) => post.getOnlyPostData());
  }

  async getAllPostsByUsername(username: string) {
    const posts = await this.postRepository.find({
      relations: ["user"],
      where: { user: { username } },
    });
    return posts.map((post) => post.getOnlyPostData());
  }

  async getPost(id: number, username: string) {
    return this.getPostByUsername(id, username);
  }

  async getPostByUsername(id: number, username: string) {
    const post = await this.postRepository.findOne({
      relations: ["user"],
      where: { id, user: { username } },
    });

    return post?.getOnlyPostData();
  }

  async search(searchDto: SearchDto) {
    const posts = await this.postRepository.find({
      relations: ["user"],
      where: [
        { title: ILike(`%${searchDto?.title}%`) },
        { content: ILike(`%${searchDto?.content}%`) },
        { user: { username: ILike(`%${searchDto?.username}%`) } },
      ],
    });

    return posts?.map((post) => post.getOnlyPostData());
  }

  async updatePost(id: number, postDto: Partial<PostDto>) {
    await this.postRepository.update(id, postDto);
    const post = await this.postRepository.findOneBy({ id });
    return post.getOnlyPostData();
  }
}
