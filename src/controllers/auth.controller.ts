import { CreateUserDto } from "@app-dtos/create-user.dto";
import { LoginDto } from "@app-dtos/login.dto";
import { UserPayloadDto } from "@app-dtos/user-payload.dto";
import { JwtService } from "@app-services/jwt.service";
import { UsersService } from "@app-services/users.service";
import { Request, Response } from "express";

const usersService = new UsersService();
const jwtService = new JwtService();

export const login = async (req: Request | any, res: Response) => {
  const loginDto: LoginDto = req.body;
  const user = await usersService.findOneByLogin(loginDto);

  if (!user) return res.status(400).send({ message: "Invalid Credentials" });

  const userPayload: UserPayloadDto = {
    id: user.id,
    username: user.username,
    profileImageUrl: user.profileImageUrl,
    fullName: user.fullName,
  };

  const access_token = jwtService.sign(userPayload);

  return res.status(200).send({ access_token });
};

export const register = async (req: Request | any, res: Response) => {
  const createUserDto: CreateUserDto = req.body;

  const user = await usersService.createUser(createUserDto);

  if (!user)
    return res.status(400).send({ message: "User cannot be created!" });

  const userPayload: UserPayloadDto = {
    id: user.id,
    username: user.username,
    profileImageUrl: user.profileImageUrl,
    fullName: user.fullName,
  };
  const access_token = jwtService.sign(userPayload);

  return res.status(200).send({ access_token });
};
