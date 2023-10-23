import { JWT_SECRET } from "@app-config/constants";
import { UserPayloadDto } from "@app-dtos/user-payload.dto";
import jwt from "jsonwebtoken";

export class JwtService {
  jwtOptions = { expiresIn: "8h" };

  sign(userPayload: UserPayloadDto) {
    return jwt.sign(userPayload, JWT_SECRET, this.jwtOptions);
  }

  verify(token) {
    return jwt.verify(token, JWT_SECRET);
  }
}
