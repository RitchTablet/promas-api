import { Entity, Column, ManyToOne } from "typeorm";
import { User } from "./user.entity";
import { BaseEntity } from "./base.entity";

@Entity({ name: "posts" })
export class Post extends BaseEntity {
  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ nullable: true })
  imgBannerUrl?: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  getOnlyPostData() {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
      imgBannerUrl: this.imgBannerUrl,
      createdAt: this.createdAt,
      username: this.user?.username,
      profileImageUrl: this.user?.profileImageUrl,
    };
  }
}
