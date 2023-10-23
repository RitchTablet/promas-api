import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Entity({ name: "follows" })
export class Follow {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.followers)
  follower: User;

  @ManyToOne(() => User, (user) => user.followings)
  following: User;
}
