import type { NextApiRequest, NextApiResponse } from "next";
import axios, {AxiosRequestConfig} from "axios";
import { getMeetup } from '../../server/meetups.repository';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    res.status(400).json({ message: "Method not allowed" });
    return;
  }

  const {
    query: { id },
  } = req;

  const meetup = await getMeetup(id);
  if(meetup == null) {
    res.status(404).json({message: 'not found'});
    return;
  }

  const meetupDate = new Date(meetup.date);
  //TODO: Compare dates and determine beers
  const options: AxiosRequestConfig = {
    method: "GET",
    url: "https://community-open-weather-map.p.rapidapi.com/forecast/daily",
    params: {
      q: "buenos aires,ar",
      cnt: "16",
      units: "metric",
    },
    headers: {
      "x-rapidapi-key": process.env.RAPIAPI_KEY,
      "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
    },
  };

  return axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
};
