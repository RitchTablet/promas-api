import { CreateUserDto } from "@app-dtos/create-user.dto";
import { LoginDto } from "@app-dtos/login.dto";
import { myDataSource } from "@app/app-data-source";
import { Follow } from "@app/entity/follow.entity";
import { User } from "@app/entity/user.entity";
import bcrypt from "bcrypt";
import { Repository } from "typeorm";

export class UsersService {
  userRepository: Repository<User>;
  followRepository: Repository<Follow>;

  constructor() {
    this.userRepository = myDataSource.getRepository("User");
    this.followRepository = myDataSource.getRepository("Follow");
  }

  async save(user: User) {
    const userSaved = await this.userRepository.save(user);
    return userSaved?.getOnlyUserData();
  }

  async createUser(createUserDto: CreateUserDto) {
    const userCreated = this.userRepository.create(createUserDto);
    const user = await this.userRepository.save(userCreated);
    return user.getOnlyUserData();
  }

  async updateUser(id: number, userDto: User) {
    await this.userRepository.update(id, userDto);
    const user = await this.userRepository.findOneBy({ id });
    return user.getOnlyUserData();
  }

  async findOneByLogin(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const user = await this.userRepository.findOne({ where: { username } });

    console.log({ user });
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return user;
      }
    }

    return null;
  }

  async findOneByUsername(username: string) {
    const user = await this.userRepository.findOne({ where: { username } });
    return user?.getOnlyUserData();
  }

  async findOneById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async followUser(followerId: number, followingId: number): Promise<Follow> {
    const follower = await this.findOneById(followerId);
    const following = await this.findOneById(followingId);

    const follow = new Follow();
    follow.follower = follower;
    follow.following = following;

    return this.followRepository.save(follow);
  }

  async unfollowUser(followerId: number, followingId: number): Promise<string> {
    const follow = await this.findOneFollowByIds(followerId, followingId);

    if (!follow) {
      return `No estabas siguiendo al usuario con ID ${followingId}.`;
    }

    await this.followRepository.remove(follow);
    return `Has dejado de seguir al usuario con ID ${followingId}.`;
  }

  async findOneFollowByIds(followerId: number, followingId: number) {
    return this.followRepository.findOne({
      where: {
        follower: { id: followerId },
        following: { id: followingId },
      },
    });
  }

  async isFollowing(followerId: number, followingId: number): Promise<boolean> {
    const follow = await this.findOneFollowByIds(followerId, followingId);
    return !!follow;
  }

  async getFollowers(userId: number): Promise<Follow[]> {
    const user = await this.userRepository.findOne({
      relations: ["followers.follower"],
      where: { id: userId },
    });

    return user?.followers?.map((follow) => {
      const follower = follow.follower;
      delete follower.password;
      return follow;
    });
  }

  async getFollowings(userId: number): Promise<Follow[]> {
    const user = await this.userRepository.findOne({
      relations: ["followings.following"],
      where: { id: userId },
    });

    return (
      user?.followings?.map((follow) => {
        const following = follow.following;
        delete following.password;
        return follow;
      }) || []
    );
  }
}
