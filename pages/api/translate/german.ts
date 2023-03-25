import type { NextApiRequest, NextApiResponse } from "next";
import { getCookie } from "cookies-next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const key = getCookie("key", { req, res });
  const content = `"${req.body.message}" in German and break it down`;

  const apiRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content }],
    }),
    // body: JSON.stringify({
    //   model: "gpt-3.5-turbo",
    //   messages: [
    //     { role: "system", content: "You are a great German teacher." },
    //     {
    //       role: "assistant",
    //       content:
    //         "Yes, I am. I will translate your German sentence and explain the detail about the translated sentence. ",
    //     },
    //     { role: "user", content },
    //   ],
    // }),
  });

  if (apiRes.status !== 200) {
    return res.status(500).send(`open ai API status code: ${apiRes.status}`);
  }

  const json = await apiRes.json();

  res.status(200).json({
    message: !json.choices?.length ? "" : json.choices[0].message.content,
  });
}
