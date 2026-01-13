import { Box } from "@mui/material";
import Color from "color";
import { type FC, useCallback, useMemo } from "react";
import type { IConfig } from "@/lib/config/config_types";
import { BorderStyle, HandShape } from "@/lib/config/config_types";

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

  const rotationMultiplier = config.reverseRotation ? -1 : 1;
  const hoursAngle = (hours * 30 + minutes * 0.5 - 90) * rotationMultiplier;
  const minutesAngle =
    ((minutes + (config.smoothMinutesHand ? seconds / 60 : 0)) * 6 - 90) *
    rotationMultiplier;
  const secondsAngle =
    ((seconds + (config.smoothSecondsHand ? milliseconds / 1000 : 0)) * 6 -
      90) *
    rotationMultiplier;
  const millisecondsAngle = (milliseconds * 0.36 - 90) * rotationMultiplier;

  const romanNumerals = [
    "XII",
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
    "X",
    "XI",
  ];

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
  const centerDotColor = useMemo(
    () => Color(config.centerDotColor).rgb().string(),
    [config.centerDotColor],
  );
  const clockFaceGradientStart = useMemo(
    () => Color(config.clockFaceGradientStart).rgb().string(),
    [config.clockFaceGradientStart],
  );
  const clockFaceGradientEnd = useMemo(
    () => Color(config.clockFaceGradientEnd).rgb().string(),
    [config.clockFaceGradientEnd],
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

  const renderHand = useCallback(
    (angle: number, length: number, color: string, width: number) => {
      const endX = 50 + length * Math.cos((angle * Math.PI) / 180);
      const endY = 50 + length * Math.sin((angle * Math.PI) / 180);

      const glowFilter =
        config.handGlowIntensity > 0
          ? `drop-shadow(0 0 ${config.handGlowIntensity * 3}px ${color})`
          : "";
      const shadowFilter =
        config.handShadowIntensity > 0
          ? `drop-shadow(${config.handShadowIntensity}px ${config.handShadowIntensity}px ${config.handShadowIntensity * 2}px rgba(0, 0, 0, 0.5))`
          : "";
      const combinedFilter = [glowFilter, shadowFilter]
        .filter(Boolean)
        .join(" ");

      if (config.clockHandShape === HandShape.ARROW) {
        const arrowLength = length * 0.15;
        const angle1 = ((angle - 150) * Math.PI) / 180;
        const angle2 = ((angle + 150) * Math.PI) / 180;

        const arrowX1 = endX + arrowLength * Math.cos(angle1);
        const arrowY1 = endY + arrowLength * Math.sin(angle1);
        const arrowX2 = endX + arrowLength * Math.cos(angle2);
        const arrowY2 = endY + arrowLength * Math.sin(angle2);

        return (
          <g style={{ filter: combinedFilter }}>
            <line
              x1="50"
              y1="50"
              x2={endX}
              y2={endY}
              stroke={color}
              strokeWidth={width}
              strokeLinecap="round"
            />
            <polygon
              points={`${endX},${endY} ${arrowX1},${arrowY1} ${arrowX2},${arrowY2}`}
              fill={color}
            />
          </g>
        );
      }

      if (config.clockHandShape === HandShape.TRIANGLE) {
        const baseWidth = width * 2;
        const perpAngle = ((angle + 90) * Math.PI) / 180;
        const baseX1 = 50 + baseWidth * Math.cos(perpAngle);
        const baseY1 = 50 + baseWidth * Math.sin(perpAngle);
        const baseX2 = 50 - baseWidth * Math.cos(perpAngle);
        const baseY2 = 50 - baseWidth * Math.sin(perpAngle);

        return (
          <polygon
            points={`${baseX1},${baseY1} ${baseX2},${baseY2} ${endX},${endY}`}
            fill={color}
            style={{ filter: combinedFilter }}
          />
        );
      }

      if (config.clockHandShape === HandShape.ROUNDED) {
        return (
          <line
            x1="50"
            y1="50"
            x2={endX}
            y2={endY}
            stroke={color}
            strokeWidth={width}
            strokeLinecap="round"
            style={{ filter: combinedFilter }}
          />
        );
      }

      // STRAIGHT (default)
      return (
        <line
          x1="50"
          y1="50"
          x2={endX}
          y2={endY}
          stroke={color}
          strokeWidth={width}
          strokeLinecap="butt"
          style={{ filter: combinedFilter }}
        />
      );
    },
    [
      config.clockHandShape,
      config.handGlowIntensity,
      config.handShadowIntensity,
    ],
  );

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
          <radialGradient id="clockFaceCustom" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={clockFaceGradientStart} />
            <stop offset="100%" stopColor={clockFaceGradientEnd} />
          </radialGradient>
        </defs>

        {/* Clock face background */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill={
            config.clockFaceGradient
              ? "url(#clockFaceCustom)"
              : "url(#clockFace)"
          }
          style={{
            transition: `all ${config.transitionSpeed * 0.3}s ease-in-out`,
          }}
        />

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
          style={{
            transition: `all ${config.transitionSpeed * 0.3}s ease-in-out`,
          }}
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
        {!config.hideClockNumbers && (
          <g filter="url(#shadow)">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((number) => {
              const { x, y } = getNumberPosition(number);
              const displayNumber = config.useRomanNumerals
                ? romanNumerals[number % 12]
                : number;

              return (
                <text
                  key={`number-${number}`}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={digitsColor}
                  fontSize={config.useRomanNumerals ? "7" : "9"}
                  fontWeight="600"
                  fontFamily="system-ui, -apple-system, sans-serif"
                  style={{
                    transition: `all ${config.transitionSpeed * 0.3}s ease-in-out`,
                  }}
                >
                  {displayNumber}
                </text>
              );
            })}
          </g>
        )}

        {/* Hour hand */}
        {renderHand(hoursAngle, 22, hoursHandColor, config.hoursHandWidth)}

        {/* Minute hand */}
        {renderHand(
          minutesAngle,
          32,
          minutesHandColor,
          config.minutesHandWidth,
        )}

        {/* Seconds hand */}
        {!config.hideSecondsHand &&
          renderHand(
            secondsAngle,
            38,
            secondsHandColor,
            config.secondsHandWidth,
          )}

        {/* Milliseconds hand */}
        {!config.hideMillisecondsHand && (
          <g opacity={0.7}>
            {renderHand(
              millisecondsAngle,
              38,
              millisecondsHandColor,
              config.millisecondsHandWidth,
            )}
          </g>
        )}

        {/* Center dot */}
        {config.showCenterDot && (
          <circle
            cx="50"
            cy="50"
            r={2 * config.centerDotSize}
            fill={centerDotColor}
            filter="url(#shadow)"
            style={{
              transition: `all ${config.transitionSpeed * 0.3}s ease-in-out`,
            }}
          />
        )}
      </svg>
    </Box>
  );
};
