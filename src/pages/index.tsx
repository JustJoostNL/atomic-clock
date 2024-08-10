import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Container, IconButton, Typography } from "@mui/material";
import { Settings } from "@mui/icons-material";
import { JSONTree } from "react-json-tree";
import useSWR from "swr";
import { useDebug } from "@/hooks/useDebug";
import { useConfig } from "@/hooks/useConfig";
import { useVisibleOnMouseMove } from "@/hooks/useVisibleOnMouseMove";
import { SettingsDialog } from "@/components/settings/SettingsDialog";

const NTP_INTERVAL = 64 * 1000; // 64 seconds
const INTERPOLATION_INTERVAL = 10; // 10 milliseconds

async function getTime(): Promise<{ timestamp: Date; time: Date }> {
  const res = await fetch("/api/clock");
  const json = await res.json();

  return { timestamp: new Date(), time: new Date(json.now) };
}

export default function Index() {
  const debug = useDebug();
  const settingsButtonVisible = useVisibleOnMouseMove(3000);
  const { config } = useConfig();
  const [time, setTime] = useState<Date | null>(null);
  const [settingsVisible, setSettingsVisible] = useState(false);

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

  useEffect(() => {
    if (!timeData) return;

    const interval = setInterval(() => {
      setTime(getInterpolatedTime());
    }, INTERPOLATION_INTERVAL);

    return () => clearInterval(interval);
  }, [timeData, getInterpolatedTime]);

  const displayedTime = useMemo(
    () =>
      time
        ?.toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          fractionalSecondDigits: config.showMs ? 3 : undefined,
          hour12: false,
        })
        .replace(",", "."),
    [config.showMs, time],
  );

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
      <SettingsDialog
        open={settingsVisible}
        onClose={() => setSettingsVisible(false)}
      />

      {settingsButtonVisible && (
        <IconButton
          onClick={() => setSettingsVisible(true)}
          size="large"
          sx={{ position: "absolute", top: 5, right: 5 }}
        >
          <Settings fontSize="large" />
        </IconButton>
      )}

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
