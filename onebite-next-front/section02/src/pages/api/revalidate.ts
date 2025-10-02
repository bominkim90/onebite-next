import { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     await res.revalidate("/");
//     return res.json({ revalidate: true });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Revalidation Failed");
//   }
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, message: "Use POST" });
  }

  try {
    await res.revalidate("/"); // index 페이지
    return res
      .status(200)
      .json({ ok: true, revalidated: true, now: Date.now() });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false, message: "Revalidation Failed" });
  }
}
