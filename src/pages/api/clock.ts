import { NextApiRequest, NextApiResponse } from "next";
import ntpClient from "ntp-client";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse,
) {
  const handleOnNetworkTime = (
    err: string | Error | null,
    date: Date | null,
  ) => {
    if (err) {
      if (err instanceof Error) return res.status(500).send(err.message);
      return res.status(500).send(err);
    } else {
      return res.status(200).json({ date: date?.toISOString() });
    }
  };

  ntpClient.getNetworkTime("time.nist.gov", 123, handleOnNetworkTime);
}
