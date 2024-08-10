import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Box,
  Container,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { Settings } from "@mui/icons-material";
import { JSONTree } from "react-json-tree";
import useSWR from "swr";
import { useHotkeys } from "react-hotkeys-hook";
import { useDebug } from "@/hooks/useDebug";
import { useConfig } from "@/hooks/useConfig";
import { useVisibleOnMouseMove } from "@/hooks/useVisibleOnMouseMove";
import { SettingsDialog } from "@/components/settings/SettingsDialog";
import { AnalogClock } from "@/components/shared/AnalogClock";
import { KeyboardHotkey } from "@/components/shared/KeyboardHotkey";

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

  useHotkeys("s", () => setSettingsVisible((prev) => !prev));

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
          hour12: config.use12HourFormat,
        })
        .replace(",", "."),
    [
      config.fractionalSecondDigits,
      config.showMilliseconds,
      config.use12HourFormat,
      time,
    ],
  );

  const bgColor = `rgb(${config.backgroundColor.r}, ${config.backgroundColor.g}, ${config.backgroundColor.b})`;
  const textColor = `rgb(${config.textColor.r}, ${config.textColor.g}, ${config.textColor.b})`;

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
          <Tooltip
            arrow
            placement="left"
            title={
              <React.Fragment>
                Hint: Press <KeyboardHotkey>S</KeyboardHotkey> to open settings
              </React.Fragment>
            }
          >
            <IconButton
              onClick={() => setSettingsVisible(true)}
              size="large"
              sx={{ position: "absolute", top: 10, right: 15 }}
            >
              <Settings
                fontSize="large"
                htmlColor={theme.palette.getContrastText(bgColor)}
              />
            </IconButton>
          </Tooltip>
        )}

        {config.useAnalogClock && time && (
          <AnalogClock
            date={time}
            size={`${(window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight) * 0.8}`}
          />
        )}

        {!config.useAnalogClock && (
          <Typography
            fontWeight={config.fontWeight}
            color={textColor}
            fontSize={`${(120 / (cleanTimeLength - 0.5)) * config.fontSizeMultiplier}vw`}
            align="center"
            sx={{
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {displayedTime}
          </Typography>
        )}
      </Container>
      <Box sx={{ width: "100%", position: "absolute", bottom: 0 }}>
        {debug && <JSONTree data={{ timeData, config }} />}
      </Box>
    </div>
  );
}
