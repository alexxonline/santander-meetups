import * as AWS from "aws-sdk";
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID_2,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_2,
  region: process.env.AWS_REGION_2});


export function getMeetup(id) {
  const params = {
    TableName: "santander-meetups",
    Key: {
      id: id,
    },
  };

  const documentClient = new AWS.DynamoDB.DocumentClient();
  return documentClient
    .get(params)
    .promise()
    .then((data) => {
      return data.Item;
    });
}

export function listMeetups() {
  const params = {
    TableName: "santander-meetups",
  };
  const documentClient = new AWS.DynamoDB.DocumentClient();
  return documentClient
    .scan(params)
    .promise()
    .then((data) => {
      return data;
    });
}

export function insertMeetup(meetup) {
  const documentClient = new AWS.DynamoDB.DocumentClient();
  const params = {
    TableName: "santander-meetups",
    Item: meetup,
  };

  return documentClient.put(params).promise();
}

export function listMeetupParticipants(meetupId) {
  const documentClient = new AWS.DynamoDB.DocumentClient();
  const params = {
    TableName: "santander-meetup-participants",
    KeyConditionExpression: "meetupId = :id",
    ExpressionAttributeValues: {
      ":id": meetupId,
    },
  };

  return documentClient
    .query(params)
    .promise()
    .then((data) => {
      return data.Items;
    });
}

export function getParticipantCount(meetupId) {
  const documentClient = new AWS.DynamoDB.DocumentClient();
  const params = {
    TableName: "santander-meetup-participants",
    KeyConditionExpression: "meetupId = :id",
    ExpressionAttributeValues: {
      ":id": meetupId,
    },
  };

  return documentClient
    .query(params)
    .promise()
    .then((data) => {
      return data.Count;
    });
}

export function registerInMeetup(meetupId, email, name) {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: "santander-meetup-participants",
    Item: {
      meetupId,
      email,
      name,
      checked: false,
    },
  };

  return documentClient.put(params).promise();
}
