import { NextApiRequest, NextApiResponse } from "next";
import { getAllFeedbacks } from "../../lib/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { data, error } = await getAllFeedbacks();
    if (data) {
      return res.status(200).json(data);
    }
  }

  return res.status(400).json({
    message: "Unsupported Request",
  });
};

export default handler;
