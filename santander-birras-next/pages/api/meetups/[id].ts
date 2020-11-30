import type { NextApiRequest, NextApiResponse } from "next";
import {
  getMeetup,
  listMeetupParticipants,
} from "../../../server/meetups.repository";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    res.status(400).json({ message: "Method not allowed" });
    return;
  }

  const {
    query: { id },
  } = req;

  try {
    const result = await getMeetup(id);
    if (result) {
      result.participants = await listMeetupParticipants(id);
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
