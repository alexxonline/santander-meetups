import * as AWS from "aws-sdk";
import { formatDateForCompare } from "../server/date.utils";
import { TemperatureInfo, WeatherResponse } from './weather.service';

const TABLE_NAME = "santander-temperature-cache";

export function updateTemperatureCache(weatherResponse: WeatherResponse) {
  const documentClient = new AWS.DynamoDB.DocumentClient();
  const resultsToInsert = weatherResponse.list.map((item) => ({
    PutRequest: {
      Item: {
        ...item,
        city: weatherResponse.city.name,
        cityId: weatherResponse.city.id,
        country: weatherResponse.city.country,
        datecode: formatDateForCompare(new Date(item.dt * 1000)),
      },
    },
  }));

  const params = {
    RequestItems: {
      "santander-temperature-cache": resultsToInsert,
    },
  };

  console.log(params);

  return documentClient.batchWrite(params).promise();
}

export function getTemperatureFromCache(datecode: string): Promise<TemperatureInfo> {
  const documentClient = new AWS.DynamoDB.DocumentClient();
  const params = {
    TableName: TABLE_NAME,
    Key: {
      datecode: datecode,
    },
  };

  return documentClient
    .get(params)
    .promise()
    .then((data) => data.Item as unknown as TemperatureInfo);
}
