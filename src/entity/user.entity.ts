import { Entity, Column, BeforeInsert, BeforeUpdate, OneToMany } from "typeorm";
import { Post } from "./post.entity";
import bcrypt from "bcrypt";
import { BaseEntity } from "./base.entity";
import { Follow } from "./follow.entity";

@Entity({ name: "users" })
export class User extends BaseEntity {
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: "full_name" })
  fullName: string;

  @Column({ nullable: true })
  profileImageUrl: string;

  @Column({ nullable: true })
  facebokProfile: string;

  @Column({ nullable: true })
  gmail: string;

  @Column({ nullable: true })
  githubProfile: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @BeforeInsert()
  async hashPasword() {
    if (!this.password) return;

    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }

  @OneToMany(() => Follow, (follow) => follow.following)
  followers: Follow[];

  @OneToMany(() => Follow, (follow) => follow.follower)
  followings: Follow[];

  getOnlyUserData() {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      fullName: this.fullName,
      isActive: this.isActive,
      profileImageUrl: this.profileImageUrl,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      facebokProfile: this.facebokProfile,
      gmail: this.gmail,
      githubProfile: this.githubProfile,
    };
  }
}
