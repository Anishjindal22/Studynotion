const { SQSClient } = require("@aws-sdk/client-sqs");
require("dotenv").config();


let sqsClient = null;

try {
  if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY && process.env.AWS_REGION) {
     sqsClient = new SQSClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
    console.log("SQS client initialized");
  } else {
      console.warn("SQS client not initialized: missing AWS credentials");
  }
} catch (error) {
  console.error("SQS client initialization failed:", error.message);
}

module.exports = sqsClient;
