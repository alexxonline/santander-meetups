import type { NextApiRequest, NextApiResponse } from "next";
import * as AWS from "aws-sdk";
import { getMeetup } from "../../server/meetups.repository";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    res.status(400).json({ message: "Method not allowed" });
    return;
  }

  const {
    query: { id },
  } = req;

  return getMeetup(id)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ message: "not found" });
      }
    })
    .catch((err) => {
      if (err) {
        res.status(500).json({ error: err });
        return;
      }
    });
};
