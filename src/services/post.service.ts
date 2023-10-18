import { myDataSource } from "src/app-data-source";
import { PostDto } from "src/dtos/post.dto";
import { Post } from "src/entity/post.entity";
import { Repository } from "typeorm";

export class PostService {
  postRepository: Repository<Post>;

  constructor() {
    this.postRepository = myDataSource.getRepository("Post");
  }

  createPost(postDto: PostDto) {
    const postCreated = this.postRepository.create(postDto);
    return this.postRepository.save(postCreated);
  }

  getPosts() {
    return this.postRepository.find({});
  }

  getPost(id: number) {
    return this.postRepository.findOneBy({ id });
  }
}
