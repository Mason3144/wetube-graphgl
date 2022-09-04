import * as AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
});
const S3 = new AWS.S3();

export const uploadToS3 = async ({ file }, userId, path) => {
  const { filename, createReadStream } = file;
  const Body = createReadStream();
  const Key = `${path}/${userId}-${Date.now()}-${filename
    .toLowerCase()
    .replace(/\s+/g, "")}`;

  const { Location } = await S3.upload({
    Bucket: process.env.S3_BUCKET,
    Key,
    ACL: "public-read",
    Body,
  }).promise();
  return Location;
};

export const deleteToS3 = async (url) => {
  const decodedUrl = decodeURI(url);
  const fileName = decodedUrl.split("amazonaws.com/")[1];
  const Key = fileName.replace("%2C", ",");

  await S3.deleteObject({
    Bucket: process.env.S3_BUCKET,
    Key,
  }).promise();
};
