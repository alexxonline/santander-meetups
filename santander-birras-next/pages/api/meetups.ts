import type { NextApiRequest, NextApiResponse } from "next";
import {
  listMeetups,
  listMeetupParticipants,
  insertMeetup,
} from "../../server/meetups.repository";
import * as Joi from "joi";
import { v4 as uuidv4 } from "uuid";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      await listAllMeetupsHandler(req, res);
      break;
    case "POST":
      await insertMeetupHandler(req, res);
      break;
    default:
      res.status(400).json({ message: "Method not allowed" });
  }
};

const listAllMeetupsHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const includeParticipants = req.query.includeParticipants === "true";

  try {
    let result = await listMeetups();

    if (includeParticipants && result.Items != null) {
      for (let i = 0; i < result.Items.length; i++) {
        result.Items[i].participants = await listMeetupParticipants(
          result.Items[i].id
        );
      }
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const insertMeetupHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(30).required(),
    description: Joi.string().trim().min(3).max(400).required(),
    id: Joi.string().allow(null, ""),
    participants: Joi.array(),
    formattedDate: Joi.string().trim().min(10).max(30).required(),
    date: Joi.number().required()
  });


  const valResult = schema.validate(req.body);

  if (valResult.error != null) {
    res.status(400).json({ message: "The input parameters are not correct" });
    console.log(valResult.error);
    return;
  }

  try {
    req.body.id  = uuidv4();
    await insertMeetup(req.body);
    res.status(200).json({id: req.body.id});
  } catch (error) {
    res.status(500).json(error);
  }
};
