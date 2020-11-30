import type { NextApiRequest, NextApiResponse } from "next";
import jwt_decode from "jwt-decode";
import { registerInMeetup } from "../../../server/meetups.repository";
import Joi from "joi";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method != "POST") {
    res.status(400).json({ message: "Method not allowd" });
    return;
  }

  if (req.headers.authorization === null) {
    res.status(401).json({ message: "Unauthorized" });
  }

  const {
    query: { id },
  } = req;

  const token = req.headers.authorization.split(" ")[1];
  const decoded: any = jwt_decode(token);
  console.log(id);
  console.log(decoded);
  console.log(req.body);
  

  // Control simple para ver que una persona no intente inscribir a otra
  if (decoded.sub !== req.body.sub) {
    res.status(401).json({ message: "unauthorized" });
    return;
  }

  const schema = Joi.object({
    email: Joi.string().required(),
    name: Joi.string().required(),
    sub: Joi.string().required()
  });

  const valResult = schema.validate(req.body);
  if(valResult.error != null) {
    res.status(400).json({message: "The input parameters are not correct"});
    return;
  }

  try {
    await registerInMeetup(id, req.body.email, req.body.name);
    res.status(200).json({ message: "ok" });
  }
  catch(error) {
    res.status(500).json(error);
  }
};
