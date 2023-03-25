import type { NextApiRequest, NextApiResponse } from "next";
import { deleteCookie } from "cookies-next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  deleteCookie("key", { req, res });
  res.status(200).end();
}
