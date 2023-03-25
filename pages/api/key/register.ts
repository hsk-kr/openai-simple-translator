import type { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "cookies-next";

type Param = {
  key: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const param: Param = req.body;
  setCookie("key", param.key, { req, res });

  res.status(200).end();
}
