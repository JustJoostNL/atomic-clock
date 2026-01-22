"use client";
import { AccessTimeRounded, SettingsRounded } from "@mui/icons-material";
import { Container, IconButton, Tooltip, useTheme } from "@mui/material";
import { Fragment, useCallback, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { ClockDisplay } from "@/components/clocks/ClockDisplay";
import { SettingsDialog } from "@/components/settings/SettingsDialog";
import { DebugDialog } from "@/components/shared/DebugDialog";
import { KeyboardHotkey } from "@/components/shared/KeyboardHotkey";
import { useConfig } from "@/hooks/useConfig";
import { useTime } from "@/hooks/useTime";
import { useVisibleOnMouseMove } from "@/hooks/useVisibleOnMouseMove";
import { formatRGB } from "@/lib/utils";

export default function Index() {
  const { config, updateConfig } = useConfig();
  const theme = useTheme();
  const settingsButtonVisible = useVisibleOnMouseMove(3000);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [debug, setDebug] = useState(false);

  const { time, error, lastSync, isInitialized, accuracy } = useTime();

  const toggleDigitalClock = useCallback(() => {
    updateConfig({ useAnalogClock: !config.useAnalogClock });
  }, [config.useAnalogClock, updateConfig]);

  const toggleSettings = useCallback(() => {
    setSettingsVisible((prev) => !prev);
  }, []);

  const toggleDebug = useCallback(() => {
    setDebug((prev) => !prev);
  }, []);

  useHotkeys("s", toggleSettings);
  useHotkeys("a", toggleDigitalClock);
  useHotkeys("shift+d", toggleDebug);

  const backgroundColor = formatRGB(config.backgroundColor);

  return (
    <div style={{ backgroundColor }}>
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

        <DebugDialog
          open={debug}
          onClose={() => setDebug(false)}
          data={{
            time,
            lastSync,
            error: error?.message,
            isInitialized,
            accuracy,
            config,
          }}
        />

        {settingsButtonVisible && (
          <Fragment>
            <Tooltip
              arrow
              placement="left"
              title={
                <Fragment>
                  Hint: Press <KeyboardHotkey>S</KeyboardHotkey> to open
                  settings
                </Fragment>
              }
            >
              <IconButton
                onClick={() => setSettingsVisible(true)}
                size="large"
                sx={{ position: "absolute", top: 10, right: 15 }}
              >
                <SettingsRounded
                  fontSize="large"
                  htmlColor={theme.palette.getContrastText(backgroundColor)}
                />
              </IconButton>
            </Tooltip>

            <Tooltip
              arrow
              placement="left"
              title={
                <Fragment>
                  Hint: Press <KeyboardHotkey>A</KeyboardHotkey> to toggle
                  analog/digital clock
                </Fragment>
              }
            >
              <IconButton
                onClick={toggleDigitalClock}
                size="large"
                sx={{ position: "absolute", top: 80, right: 15 }}
              >
                <AccessTimeRounded
                  fontSize="large"
                  htmlColor={theme.palette.getContrastText(backgroundColor)}
                />
              </IconButton>
            </Tooltip>
          </Fragment>
        )}

        <ClockDisplay time={time} config={config} />
      </Container>
    </div>
  );
}
