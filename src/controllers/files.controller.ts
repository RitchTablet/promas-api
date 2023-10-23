import { S3Service } from "@app-services/s3.service";
import { Request, Response } from "express";

const s3Service = new S3Service(process.env.BUCKET_NAME);

export const uploadFile = async (req: Request | any, res: Response) => {
  const { file } = req;
  const { Location } = await s3Service.upload(file);
  return res.status(200).send({ message: `File was uploaded on: ${Location}` });
};
