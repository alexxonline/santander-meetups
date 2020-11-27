import type { NextApiRequest, NextApiResponse } from 'next';
import * as AWS from 'aws-sdk';
AWS.config.update({
  region: 'us-east-1'
})

export default async (req: NextApiRequest, res: NextApiResponse) => {

  if(req.method !== 'GET') {
    res.status(400).json({message: 'Method not allowed'});
    return;
  }

  const params = {
    TableName: 'santander-meetups',
  };
  const documentClient = new AWS.DynamoDB.DocumentClient();
  return documentClient.scan(params).promise()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      if(err) res.status(500).json({error: err});
    });
}