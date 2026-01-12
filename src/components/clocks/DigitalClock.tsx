"use client";
import { Box, Typography } from "@mui/material";
import { type FC, useMemo } from "react";
import type { IConfig } from "@/lib/config/config_types";
import { FontStyle } from "@/lib/config/config_types";
import { formatRGB, formatRGBA } from "@/lib/utils";

interface IProps {
  time: Date | null;
  config: IConfig;
}

export const DigitalClock: FC<IProps> = ({ time, config }) => {
  const displayedTime = useMemo(
    () =>
      time
        ?.toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
          second: config.hideSeconds ? undefined : "2-digit",
          timeZone: config.timezone,
          fractionalSecondDigits: config.showMilliseconds
            ? config.fractionalSecondDigits
            : undefined,
          hour12: config.use12HourFormat,
        })
        .replace(/[,:.]/g, (match) => {
          if (config.hideSeparators) return "";
          return match === "," ? "." : match === ":" ? ":" : ".";
        }),
    [
      config.fractionalSecondDigits,
      config.hideSeconds,
      config.hideSeparators,
      config.showMilliseconds,
      config.timezone,
      config.use12HourFormat,
      time,
    ],
  );

  const textColor = formatRGB(config.textColor);
  const dateTextColor = formatRGB(config.dateTextColor);
  const textBackgroundColor = formatRGBA(
    config.textBackgroundColor,
    config.textBackgroundOpacity,
  );

  const cleanTimeLength = displayedTime
    ? displayedTime.replace(/:/g, "").length
    : 1;

  const calculatedFontSize = `${(120 / (cleanTimeLength - 0.5)) * config.fontSizeMultiplier}vw`;
  const calculatedDateFontSize = `${(120 / 25) * config.fontSizeMultiplier}vw`;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Typography
        fontWeight={config.fontWeight}
        color={textColor}
        fontSize={calculatedFontSize}
        align="center"
        sx={{
          overflow: "hidden",
          whiteSpace: "nowrap",
          bgcolor: textBackgroundColor,
          borderRadius: config.textBackgroundRadius,
          fontFamily: '"Roboto Mono", monospace',
          fontVariantNumeric: "tabular-nums",
          fontStyle:
            config.fontStyle === FontStyle.ITALIC
              ? "italic"
              : config.fontStyle === FontStyle.OBLIQUE
                ? "oblique"
                : "normal",
          letterSpacing: config.hideSeparators ? "0.05em" : "0",
        }}
      >
        {displayedTime}
      </Typography>

      {config.displayDate && (
        <Typography
          color={dateTextColor}
          fontSize={calculatedDateFontSize}
          align="center"
          sx={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            fontFamily: '"Roboto", sans-serif',
          }}
        >
          {time?.toLocaleDateString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: config.timezone,
          })}
        </Typography>
      )}
    </Box>
  );
};
