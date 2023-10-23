import { JwtService } from "@app-services/jwt.service";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  try {
    const jwtService = new JwtService();
    const user = jwtService.verify(token);
    req.user = user;
    next();
  } catch (error) {
    return res.sendStatus(401);
  }
};
