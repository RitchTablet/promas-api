import aws from "aws-sdk";

const isProduction = process.env.IS_PRODUCTION;

let awsConfig: any = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.REGION,
};

if (!isProduction)
  awsConfig.s3 = {
    endpoint: process.env.LOCALSTACK_ENDPOINT,
    s3ForcePathStyle: true,
  }; // this a especial conf for localstack

aws.config.update(awsConfig);

export default aws;
