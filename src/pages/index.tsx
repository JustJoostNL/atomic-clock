import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Container, Typography } from "@mui/material";
import { JSONTree } from "react-json-tree";
import useSWR from "swr";
import { useDebug } from "@/hooks/useDebug";
import { useConfig } from "@/hooks/useConfig";

const NTP_INTERVAL = 64 * 1000; // 64 seconds
const INTERPOLATION_INTERVAL = 10; // 10 milliseconds

async function getTime(): Promise<{ timestamp: Date; time: Date }> {
  const res = await fetch("/api/clock");

  const json = await res.json();
  const now = new Date();

  return { timestamp: now, time: new Date(json.date) };
}

export default function Index() {
  const debug = useDebug();
  const { config } = useConfig();
  const [time, setTime] = useState<Date | null>(null);

  const { data: timeData } = useSWR("time", getTime, {
    refreshInterval: NTP_INTERVAL,
    revalidateOnFocus: false,
  });

  const getInterpolatedTime = useCallback(() => {
    if (!timeData) return new Date();

    const now = new Date();
    const timeDiff = now.getTime() - timeData.timestamp.getTime();
    const interpolatedTime = new Date(timeData.time.getTime() + timeDiff);

    return interpolatedTime;
  }, [timeData]);

  const displayedTime = useMemo(
    () =>
      time
        ?.toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          fractionalSecondDigits: 3,
          hour12: false,
        })
        .replace(",", "."),
    [time],
  );

  useEffect(() => {
    if (!timeData) return;

    const interval = setInterval(() => {
      setTime(getInterpolatedTime());
    }, INTERPOLATION_INTERVAL);

    return () => clearInterval(interval);
  }, [timeData, getInterpolatedTime]);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Typography
        fontWeight={700}
        fontSize={100}
        align="center"
        alignContent="center"
      >
        {displayedTime}
      </Typography>
      {debug && <JSONTree data={{ timeData, config }} />}
    </Container>
  );
}
