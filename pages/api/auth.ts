// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

// type Data = {
//   name: string
// }

import { supabaseClient } from "../../lib/client";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  supabaseClient.auth.api.setAuthCookie(req, res);
}
