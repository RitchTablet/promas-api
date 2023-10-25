import { Entity, Column, ManyToOne } from "typeorm";
import { User } from "./user.entity";
import { BaseEntity } from "./base.entity";

@Entity({ name: "posts" })
export class Post extends BaseEntity {
  @Column()
  title: string;

  @Column("text")
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
      createdAt: new Date(this.createdAt).toISOString(),
      username: this.user?.username,
      profileImageUrl: this.user?.profileImageUrl,
    };
  }
}
