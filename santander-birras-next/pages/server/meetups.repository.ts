import * as AWS from "aws-sdk";
AWS.config.update({
  region: "us-east-1",
});

export async function getMeetup(id) {
  const params = {
    TableName: "santander-meetups",
    KeyConditionExpression: "id = :id",
    ExpressionAttributeValues: {
      ":id": id,
    },
  };
  const documentClient = new AWS.DynamoDB.DocumentClient();
  return documentClient
    .query(params)
    .promise()
    .then((data) => {
      if (data.Items && data.Items.length === 0) {
        return null;
      } else return data.Items[0];
    });
}
