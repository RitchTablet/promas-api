import { RequestHandler } from "express";

export const getEchos: RequestHandler = (req, res, next) =>
  res.json([{ message: "Echo 1s!" }]);
