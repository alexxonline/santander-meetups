import type { NextApiRequest, NextApiResponse } from "next";
import {
  getMeetup,
  getParticipantCount,
} from "../../../server/meetups.repository";
import {
  getTemperatureFromCache,
  updateTemperatureCache,
} from "../../../server/temperature.repository";
import { getTemperatureForNextDays } from "../../../server/weather.service";
import { formatDateForCompare } from "../../../server/date.utils";
import {
  getBeerBoxCount,
  getRelationByPerson,
} from "../../../server/beer.utils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    res.status(400).json({ message: "Method not allowed" });
    return;
  }

  const {
    query: { id },
  } = req;

  const meetup = await getMeetup(id);
  if (meetup == null) {
    res.status(404).json({ message: "meetup not found" });
    return;
  }

  const participantsCount = await getParticipantCount(id);

  const dateForCompare = formatDateForCompare(new Date(meetup.date));
  let temperatureForTheDay = await getTemperatureFromCache(dateForCompare);

  if (temperatureForTheDay == null) {
    const weatherResponse = await getTemperatureForNextDays();
    updateTemperatureCache(weatherResponse);

    temperatureForTheDay = weatherResponse.list.find(
      (item) =>
        formatDateForCompare(new Date(item.dt * 1000)) === dateForCompare
    );
  }

  let result = null;

  if (temperatureForTheDay === null) {
    result = {
      success: false,
      message: "No tenemos información de la temperatura para ese día.",
    };
  } else {
    result = {
      success: true,
      message: "Temperatura encontrada",
      temperature: temperatureForTheDay.temp.day,
      beerBoxCount: getBeerBoxCount(
        temperatureForTheDay.temp.day,
        participantsCount
      ),
      relationByPerson: getRelationByPerson(temperatureForTheDay.temp.day),
    };
  }

  res.status(200).json(result);
};
