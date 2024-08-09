import React, { useCallback, useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import { JSONTree } from "react-json-tree";
import useSWR from "swr";
import { useDebug } from "@/hooks/useDebug";

async function getTime(): Promise<{ timestamp: Date; time: Date }> {
  const res = await fetch("/api/clock");

  const json = await res.json();
  const now = new Date();

  return { timestamp: now, time: new Date(json.date) };
}

export default function Index() {
  const debug = useDebug();
  const [time, setTime] = useState<Date | null>(null);

  const { data: timeData } = useSWR("time", getTime, {
    refreshInterval: 1000,
  });

  const getInterpolatedTime = useCallback(() => {
    if (!timeData) return new Date();

    const now = new Date();
    const timeDiff = now.getTime() - timeData.timestamp.getTime();
    const interpolatedTime = new Date(timeData.time.getTime() + timeDiff);

    return interpolatedTime;
  }, [timeData]);

  useEffect(() => {
    if (!timeData) return;

    const interval = setInterval(() => {
      setTime(getInterpolatedTime());
    }, 100);

    return () => clearInterval(interval);
  }, [timeData, getInterpolatedTime]);

  return (
    <Container
      sx={{
        display: "grid",
        placeItems: "center",
        height: "100vh",
      }}
    >
      <Typography
        fontSize={300}
        fontWeight={700}
        align="center"
        justifySelf="center"
      >
        {time?.toLocaleTimeString()}
      </Typography>
      {debug && <JSONTree data={timeData} />}
    </Container>
  );
}
