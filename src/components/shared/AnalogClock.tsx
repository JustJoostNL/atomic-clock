import { useTheme } from "@mui/material";
import Color from "color";
import { FC, useCallback } from "react";
import { useConfig } from "@/hooks/useConfig";

interface IProps {
  date: Date;
  size?: string | number;
}

export const AnalogClock: FC<IProps> = ({ date, size = 200 }) => {
  const { config } = useConfig();
  const theme = useTheme();

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const milliseconds = date.getMilliseconds();

  const hoursAngle = hours * 30 + minutes * 0.5;
  const minutesAngle = minutes * 6;
  const secondsAngle = (seconds + milliseconds / 1000) * 6;
  const millisecondsAngle = milliseconds * 0.36;

  const getNumberPosition = useCallback((number: number) => {
    const angle = number * 30 - 90;
    const x = 50 + 40 * Math.cos((angle * Math.PI) / 180);
    const y = 50 + 40 * Math.sin((angle * Math.PI) / 180);

    return { x, y };
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={theme.palette.getContrastText(
            theme.palette.background.default,
          )}
        />
        {Array.from({ length: 12 }, (_, i) => i + 1).map((number) => {
          const { x, y } = getNumberPosition(number);
          return (
            <text
              key={number}
              x={x}
              y={y}
              textAnchor="middle"
              alignmentBaseline="middle"
              fill={theme.palette.getContrastText(
                theme.palette.background.default,
              )}
              fontSize="10"
              dy="0.3em"
            >
              {number}
            </text>
          );
        })}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="30"
          stroke={Color(config.hoursHandColor).rgb().string()}
          strokeWidth="2"
          transform={`rotate(${hoursAngle} 50 50)`}
        />
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="20"
          stroke={Color(config.minutesHandColor).rgb().string()}
          strokeWidth="1"
          transform={`rotate(${minutesAngle} 50 50)`}
        />
        {!config.hideSecondsHand && (
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="10"
            stroke={Color(config.secondsHandColor).rgb().string()}
            strokeWidth="0.5"
            transform={`rotate(${secondsAngle} 50 50)`}
          />
        )}
        {!config.hideMillisecondsHand && (
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="10"
            stroke={Color(config.millisecondsHandColor).rgb().string()}
            strokeWidth="0.5"
            transform={`rotate(${millisecondsAngle} 50 50)`}
          />
        )}
      </svg>
    </div>
  );
};
