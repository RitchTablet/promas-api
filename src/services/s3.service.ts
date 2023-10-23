import aws from "@app-config/aws.config";
import { FileDto } from "@app-dtos/file.dto";

export class S3Service {
  s3: aws.S3;
  constructor(private readonly _bucketName: string) {
    this.s3 = new aws.S3();
  }

  async upload(file: FileDto) {
    try {
      const params = {
        Bucket: this._bucketName,
        Key: file.originalname,
        Body: file.buffer,
        ContentType: file.mimetype,
      };
      const s3Response = await this.s3.upload(params).promise();
      console.log("S3 details file:", s3Response);
      return s3Response;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
