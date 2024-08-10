import { NextApiRequest, NextApiResponse } from "next";
import ntpClient from "ntp-client";

const fallbackServer = "time.nist.gov";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { server } = req.query as { server?: string };

  const handleOnNetworkTime = (
    err: string | Error | null,
    date: Date | null,
  ) => {
    if (err) {
      if (err instanceof Error) return res.status(500).send(err.message);
      return res.status(500).send(err);
    } else {
      return res.status(200).json({ now: date?.toISOString() });
    }
  };

  ntpClient.getNetworkTime(server ?? fallbackServer, 123, handleOnNetworkTime);
}
