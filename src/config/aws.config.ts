import aws from "aws-sdk";

aws.config.update({
  s3: { endpoint: "http://localhost:4566", s3ForcePathStyle: true }, // La URL de LocalStack
  accessKeyId: "dummy-access-key",
  secretAccessKey: "dummy-secret-key",
  region: "us-east-1", // Puedes utilizar cualquier región
});

export default aws;
