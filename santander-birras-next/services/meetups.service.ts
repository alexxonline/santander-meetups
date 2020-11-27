import { Meetup } from "../models/meetup.model";

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


export function getNextThreeMeetups(): Array<Meetup> {
  return mockListOfMeetups;
}

export function getMeetup(id: string): Meetup {
  return mockListOfMeetups[0];
}

export function listAllMeetups(): Array<Meetup> {
  return [...mockListOfMeetups, ...mockListOfMeetups]
}

export async function getNextThreeMeetupsAsync() {
  const meetups = await listAllMeetupsAsync();
  return meetups.splice(0, 3);
}

export async function listAllMeetupsAsync(): Promise<Array<Meetup>> {
  const response = await fetch('/api/meetups');
  const data = await response.json();
  return data.Items;
}

export async function getMeetupAsync(id: string): Promise<Meetup> {
  const response = await fetch(`/api/meetups/${id}`);
  const data = await response.json();
  return data;
}