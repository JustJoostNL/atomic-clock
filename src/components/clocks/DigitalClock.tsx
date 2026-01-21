"use client";
import { Box, Typography } from "@mui/material";
import Color from "color";
import { type FC, useMemo } from "react";
import type { IConfig } from "@/lib/config/config_types";
import { FontStyle, TextTransform } from "@/lib/config/config_types";
import { formatRGB, formatRGBA } from "@/lib/utils";

interface IProps {
  time: Date | null;
  config: IConfig;
}

export const DigitalClock: FC<IProps> = ({ time, config }) => {
  const displayedTime = useMemo(() => {
    if (!time) return undefined;

    // For fractional digits > 3, we need custom formatting since toLocaleTimeString only supports up to 3
    const useCustomFractional = config.showMilliseconds && config.fractionalSecondDigits > 3;
    
    let timeStr: string;
    
    if (useCustomFractional) {
      // Format without fractional seconds first
      const baseTime = time.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        second: config.hideSeconds ? undefined : "2-digit",
        timeZone: config.timezone,
        hour12: config.use12HourFormat,
      });
      
      // Get high-precision fractional seconds using performance.now()
      const perfNow = performance.now();
      const perfFractional = (perfNow % 1000) / 1000; // Get sub-second part
      const milliseconds = time.getMilliseconds();
      const combinedFractional = (milliseconds + perfFractional) / 1000;
      
      // Format fractional part with requested digits
      const fractionalStr = combinedFractional
        .toFixed(config.fractionalSecondDigits)
        .slice(1); // Remove leading "0"
      
      timeStr = baseTime + fractionalStr;
    } else {
      // Use native formatting for 1-3 digits
      timeStr = time.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        second: config.hideSeconds ? undefined : "2-digit",
        timeZone: config.timezone,
        fractionalSecondDigits: config.showMilliseconds
          ? (config.fractionalSecondDigits as 1 | 2 | 3)
          : undefined,
        hour12: config.use12HourFormat,
      });
    }
    
    // Replace separators
    timeStr = timeStr.replace(/[,:.]/g, (match) => {
      if (config.hideSeparators) return "";
      if (config.customSeparator) {
        return match === "," ? "." : config.customSeparator;
      }
      return match === "," ? "." : match === ":" ? ":" : ".";
    });

    if (config.textTransform === TextTransform.UPPERCASE) {
      return timeStr?.toUpperCase();
    }
    if (config.textTransform === TextTransform.LOWERCASE) {
      return timeStr?.toLowerCase();
    }
    if (!timeStr) return timeStr;
    if (config.textTransform === TextTransform.CAPITALIZE) {
      return timeStr.charAt(0).toUpperCase() + timeStr.slice(1);
    }
    return timeStr;
  }, [
    config.fractionalSecondDigits,
    config.hideSeconds,
    config.hideSeparators,
    config.showMilliseconds,
    config.timezone,
    config.use12HourFormat,
    config.customSeparator,
    config.textTransform,
    time,
  ]);

  const textColor = formatRGB(config.textColor);
  const dateTextColor = formatRGB(config.dateTextColor);
  const textBackgroundColor = formatRGBA(
    config.textBackgroundColor,
    config.textBackgroundOpacity,
  );
  const textGradientStart = useMemo(
    () => Color(config.textGradientStart).rgb().string(),
    [config.textGradientStart],
  );
  const textGradientEnd = useMemo(
    () => Color(config.textGradientEnd).rgb().string(),
    [config.textGradientEnd],
  );

  const textGlow = useMemo(() => {
    if (config.textGlowIntensity === 0) return "none";
    return `0 0 ${config.textGlowIntensity * 5}px ${textColor}, 0 0 ${config.textGlowIntensity * 10}px ${textColor}`;
  }, [config.textGlowIntensity, textColor]);

  const textShadow = useMemo(() => {
    if (config.textShadowIntensity === 0 && config.textGlowIntensity === 0)
      return "none";
    const shadows = [];
    if (config.textGlowIntensity > 0) {
      shadows.push(textGlow);
    }
    if (config.textShadowIntensity > 0) {
      shadows.push(
        `${config.textShadowIntensity * 2}px ${config.textShadowIntensity * 2}px ${config.textShadowIntensity * 4}px rgba(0, 0, 0, 0.8)`,
      );
    }
    return shadows.join(", ");
  }, [config.textShadowIntensity, config.textGlowIntensity, textGlow]);

  const textStyle = useMemo(() => {
    if (config.textGradient) {
      return {
        background: `linear-gradient(135deg, ${textGradientStart}, ${textGradientEnd})`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      };
    }
    return { color: textColor };
  }, [config.textGradient, textGradientStart, textGradientEnd, textColor]);

  const cleanTimeLength = displayedTime
    ? displayedTime.replace(/:/g, "").length
    : 1;

  const calculatedFontSize = `${(120 / (cleanTimeLength - 0.5)) * config.fontSizeMultiplier}vw`;
  const calculatedDateFontSize = `${(120 / 25) * config.fontSizeMultiplier}vw`;

  const pulseAnimation = config.pulseAnimation
    ? `pulse ${2 / config.pulseSpeed}s ease-in-out infinite`
    : "none";

  const blinkAnimation = config.blinkSeparators
    ? `blink ${1 / config.pulseSpeed}s step-end infinite`
    : "none";

  const displayedTimeWithBlink = useMemo(() => {
    if (!config.blinkSeparators || config.hideSeparators) {
      return displayedTime;
    }
    return displayedTime;
  }, [displayedTime, config.blinkSeparators, config.hideSeparators]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
        "@keyframes pulse": {
          "0%, 100%": { transform: "scale(1)", opacity: 1 },
          "50%": { transform: "scale(1.02)", opacity: 0.95 },
        },
        "@keyframes blink": {
          "0%, 49%": { opacity: 1 },
          "50%, 100%": { opacity: 0 },
        },
      }}
    >
      <Typography
        fontWeight={config.fontWeight}
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
          letterSpacing: config.hideSeparators
            ? "0.05em"
            : `${config.letterSpacing}em`,
          textShadow: textShadow,
          animation: pulseAnimation,
          transition: `all ${config.transitionSpeed * 0.3}s ease-in-out`,
          ...textStyle,
          "& .separator": { animation: blinkAnimation },
        }}
      >
        {config.blinkSeparators && !config.hideSeparators
          ? displayedTimeWithBlink?.split("").map((char, idx) => {
              const isSeparator =
                char === ":" || char === "." || char === config.customSeparator;
              return isSeparator ? (
                <span key={`sep-${idx}-${char}`} className="separator">
                  {char}
                </span>
              ) : (
                <span key={`char-${idx}-${char}`}>{char}</span>
              );
            })
          : displayedTimeWithBlink}
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
