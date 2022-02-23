import { NextApiRequest, NextApiResponse } from "next";
import { getFeedbackBySlug } from "../../../lib/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET" && req.query.slug) {
    const { data, error } = await getFeedbackBySlug(req.query.slug as string);
    if (data) {
      return res.status(200).json(data);
    }
  }

  return res.status(400).json({
    message: "Unsupported Request",
  });
};

export default handler;
