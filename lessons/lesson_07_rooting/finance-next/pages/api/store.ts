// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const dummyStore: any = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    console.log(req.body);
    const payload = req.body;
    dummyStore.push(payload);
    res.status(200).json({ name: "Jonny Sins" });
  } else {
    res.status(200).json(dummyStore);
  }
}
