import { Meetup } from "../models/meetup.model";
import { TemperatureAndBeer } from "../models/temperatureAndBeer.model";

const mockListOfMeetups = [
  {
    id: "4",
    title: "NodeJs Meetup",
    description: "En esta meetup estaremos viendo node.",
    formattedDate: "15/12/2020 a las 19:00",
    participants: [
      {
        name: "Roberto Perez",
        email: "rob@gmail.com",
        checked: false,
      },
      {
        name: "Jimena Gonzalez",
        email: "jimena@gmail.com",
        checked: false,
      },
      {
        name: "Rocío Donna",
        email: "rocio@gmail.com",
        checked: false,
      },
    ],
  },
  {
    id: "5",
    title: "React Meetup",
    description: "En esta meetup estaremos viendo node.",
    formattedDate: "15/12/2020 a las 19:00",
    participants: [
      {
        name: "Roberto Perez",
        email: "rob@gmail.com",
        checked: false,
      },
      {
        name: "Jimena Gonzalez",
        email: "jimena@gmail.com",
        checked: false,
      },
      {
        name: "Rocío Donna",
        email: "rocio@gmail.com",
        checked: false,
      },
    ],
  },
  {
    id: "7",
    title: "Java Meetup",
    description: "En esta meetup estaremos viendo java.",
    formattedDate: "15/12/2020 a las 19:00",
    participants: [
      {
        name: "Roberto Perez",
        email: "rob@gmail.com",
        checked: false,
      },
      {
        name: "Jimena Gonzalez",
        email: "jimena@gmail.com",
        checked: false,
      },
      {
        name: "Rocío Donna",
        email: "rocio@gmail.com",
        checked: false,
      },
    ],
  },
];

export function getNextThreeMeetupsMock(): Array<Meetup> {
  return mockListOfMeetups;
}

export function getMeetupMock(id: string): Meetup {
  return mockListOfMeetups[0];
}

export function listAllMeetupsMock(): Array<Meetup> {
  return [...mockListOfMeetups, ...mockListOfMeetups];
}

export async function getNextThreeMeetups(accessToken: string) {
  const meetups = await listAllMeetups(false, accessToken);
  return meetups.splice(0, 3);
}

export async function listAllMeetups(
  includeParticipants = false,
  accessToken: string
): Promise<Array<Meetup>> {
  const includeParticipantsQuery = includeParticipants
    ? "?includeParticipants=true"
    : "";
  
  const response = await fetch(`/api/meetups${includeParticipantsQuery}`, {
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  });
  const data = await response.json();
  return data.Items;
}

export async function getMeetup(id: string, accessToken: string): Promise<Meetup> {
  const response = await fetch(`/api/meetups/${id}`, {
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  });
  const data = await response.json();
  return data;
}

export async function getTempAndBeer(
  meetupId: string,
  accessToken: string,
): Promise<TemperatureAndBeer> {
  const response = await fetch(`/api/beers/${meetupId}`, {
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  });
  const data = await response.json();
  return data;
}

export async function insertMeetup(meetup, accessToken:string): Promise<{ id: string }> {
  const response = await fetch(`/api/meetups`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    },
    body: JSON.stringify(meetup),
    method: "POST",
  });
  const data = await response.json();
  return data;
}
