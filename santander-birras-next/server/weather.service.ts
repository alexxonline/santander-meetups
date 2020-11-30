import axios, { AxiosRequestConfig } from "axios";
import { retry } from './mixed.utils';
export interface WeatherResponse {
  city: {
    id: number;
    name: string;
    country: string;
  };
  list: Array<TemperatureInfo>;
}

export interface TemperatureInfo {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
}

export async function getTemperatureForNextDays() : Promise<WeatherResponse> {
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

  const result = await retry(3, () => axios.request(options));
  return result.data;
}