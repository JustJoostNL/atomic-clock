import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Container, IconButton, Typography, useTheme } from "@mui/material";
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
  const { config } = useConfig();
  const debug = useDebug();
  const settingsButtonVisible = useVisibleOnMouseMove(3000);
  const theme = useTheme();
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
          fractionalSecondDigits: config.showMilliseconds
            ? config.fractionalSecondDigits
            : undefined,
          hour12: false,
        })
        .replace(",", "."),
    [config.fractionalSecondDigits, config.showMilliseconds, time],
  );

  const bgColor = `rgb(${config.backgroundColor.r}, ${config.backgroundColor.g}, ${config.backgroundColor.b})`;

  const cleanTimeLength = displayedTime
    ? displayedTime.replace(/:/g, "").length
    : 1;

  return (
    <div style={{ backgroundColor: bgColor }}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
          padding: "0 20px",
          boxSizing: "border-box",
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
            <Settings
              fontSize="large"
              htmlColor={theme.palette.getContrastText(bgColor)}
            />
          </IconButton>
        )}

        <Typography
          fontWeight={700}
          color={`rgb(${config.textColor.r}, ${config.textColor.g}, ${config.textColor.b})`}
          fontSize={`${(120 / (cleanTimeLength - 0.5)) * 1}vw`}
          align="center"
          sx={{
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {displayedTime}
        </Typography>
        {debug && <JSONTree data={{ timeData, config }} />}
      </Container>
    </div>
  );
}
