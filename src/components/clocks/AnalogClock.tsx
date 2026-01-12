import { Box } from "@mui/material";
import Color from "color";
import { type FC, useCallback, useMemo } from "react";
import type { IConfig } from "@/lib/config/config_types";
import { BorderStyle } from "@/lib/config/config_types";

interface IProps {
  date: Date;
  size?: string | number;
  config: IConfig;
}

export const AnalogClock: FC<IProps> = ({ date, size = 200, config }) => {
  const hours = date.getHours() % 12;
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const milliseconds = date.getMilliseconds();

  const hoursAngle = hours * 30 + minutes * 0.5 - 90;
  const minutesAngle =
    (minutes + (config.smoothMinutesHand ? seconds / 60 : 0)) * 6 - 90;
  const secondsAngle =
    (seconds + (config.smoothSecondsHand ? milliseconds / 1000 : 0)) * 6 - 90;
  const millisecondsAngle = milliseconds * 0.36 - 90;

  const borderColor = useMemo(
    () => Color(config.clockBorderColor).rgb().string(),
    [config.clockBorderColor],
  );
  const digitsColor = useMemo(
    () => Color(config.clockDigitsColor).rgb().string(),
    [config.clockDigitsColor],
  );
  const tickMarksColor = useMemo(
    () => Color(config.clockTickMarksColor).rgb().string(),
    [config.clockTickMarksColor],
  );
  const hoursHandColor = useMemo(
    () => Color(config.hoursHandColor).rgb().string(),
    [config.hoursHandColor],
  );
  const minutesHandColor = useMemo(
    () => Color(config.minutesHandColor).rgb().string(),
    [config.minutesHandColor],
  );
  const secondsHandColor = useMemo(
    () => Color(config.secondsHandColor).rgb().string(),
    [config.secondsHandColor],
  );
  const millisecondsHandColor = useMemo(
    () => Color(config.millisecondsHandColor).rgb().string(),
    [config.millisecondsHandColor],
  );

  const getNumberPosition = useCallback((number: number) => {
    const angle = (number * 30 - 90) * (Math.PI / 180);
    const radius = 33;
    return {
      x: 50 + radius * Math.cos(angle),
      y: 50 + radius * Math.sin(angle),
    };
  }, []);

  const getTickMarkPoints = useCallback((index: number) => {
    const angle = (index * 6 - 90) * (Math.PI / 180);
    const isHourMark = index % 5 === 0;
    const innerRadius = isHourMark ? 39 : 42;
    const outerRadius = 44;

    return {
      x1: 50 + innerRadius * Math.cos(angle),
      y1: 50 + innerRadius * Math.sin(angle),
      x2: 50 + outerRadius * Math.cos(angle),
      y2: 50 + outerRadius * Math.sin(angle),
      isHourMark,
    };
  }, []);

  const strokeDasharray = useMemo(() => {
    if (config.clockBorderStyle === BorderStyle.DOTTED) return "2, 3";
    if (config.clockBorderStyle === BorderStyle.DASHED) return "8, 4";
    return "none";
  }, [config.clockBorderStyle]);

  const strokeWidth = useMemo(() => {
    if (
      config.clockBorderStyle === BorderStyle.DOTTED ||
      config.clockBorderStyle === BorderStyle.DASHED
    ) {
      return 1.5;
    }
    return config.clockBorderWidth;
  }, [config.clockBorderStyle, config.clockBorderWidth]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible" }}
        aria-label="Analog Clock"
      >
        <title>Analog Clock</title>
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="0.5" />
            <feOffset dx="0" dy="0.5" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="clockFace" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.05)" />
            <stop offset="100%" stopColor="rgba(0, 0, 0, 0.02)" />
          </radialGradient>
        </defs>

        {/* Clock face background */}
        <circle cx="50" cy="50" r="45" fill="url(#clockFace)" />

        {/* Clock border */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={borderColor}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeLinecap="round"
        />

        {/* Tick marks */}
        <g filter="url(#shadow)">
          {Array.from({ length: 60 }, (_, i) => {
            const tickNumber = i + 1;
            const { x1, y1, x2, y2, isHourMark } = getTickMarkPoints(i);

            return (
              <line
                key={`tick-mark-${tickNumber}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={tickMarksColor}
                strokeWidth={
                  (isHourMark ? 1.8 : 0.6) *
                  config.clockTickMarksWidthMultiplier
                }
                strokeLinecap="round"
                opacity={isHourMark ? 1 : 0.6}
              />
            );
          })}
        </g>

        {/* Hour numbers */}
        <g filter="url(#shadow)">
          {Array.from({ length: 12 }, (_, i) => i + 1).map((number) => {
            const { x, y } = getNumberPosition(number);

            return (
              <text
                key={`number-${number}`}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                fill={digitsColor}
                fontSize="9"
                fontWeight="600"
                fontFamily="system-ui, -apple-system, sans-serif"
              >
                {number}
              </text>
            );
          })}
        </g>

        {/* Hour hand */}
        <line
          x1="50"
          y1="50"
          x2={50 + 22 * Math.cos((hoursAngle * Math.PI) / 180)}
          y2={50 + 22 * Math.sin((hoursAngle * Math.PI) / 180)}
          stroke={hoursHandColor}
          strokeWidth={config.hoursHandWidth}
          strokeLinecap="round"
          filter="url(#shadow)"
        />

        {/* Minute hand */}
        <line
          x1="50"
          y1="50"
          x2={50 + 32 * Math.cos((minutesAngle * Math.PI) / 180)}
          y2={50 + 32 * Math.sin((minutesAngle * Math.PI) / 180)}
          stroke={minutesHandColor}
          strokeWidth={config.minutesHandWidth}
          strokeLinecap="round"
          filter="url(#shadow)"
        />

        {/* Seconds hand */}
        {!config.hideSecondsHand && (
          <line
            x1="50"
            y1="50"
            x2={50 + 38 * Math.cos((secondsAngle * Math.PI) / 180)}
            y2={50 + 38 * Math.sin((secondsAngle * Math.PI) / 180)}
            stroke={secondsHandColor}
            strokeWidth={config.secondsHandWidth}
            strokeLinecap="round"
            filter="url(#shadow)"
          />
        )}

        {/* Milliseconds hand */}
        {!config.hideMillisecondsHand && (
          <line
            x1="50"
            y1="50"
            x2={50 + 38 * Math.cos((millisecondsAngle * Math.PI) / 180)}
            y2={50 + 38 * Math.sin((millisecondsAngle * Math.PI) / 180)}
            stroke={millisecondsHandColor}
            strokeWidth={config.millisecondsHandWidth}
            strokeLinecap="round"
            opacity={0.7}
          />
        )}

        {/* Center dot */}
        <circle
          cx="50"
          cy="50"
          r="2"
          fill={hoursHandColor}
          filter="url(#shadow)"
        />
      </svg>
    </Box>
  );
};
