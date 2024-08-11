import Color from "color";
import { FC, useCallback } from "react";
import { useConfig } from "@/hooks/useConfig";
import { BorderStyle } from "@/lib/config/config_types";

interface IProps {
  date: Date;
  size?: string | number;
}

const numberDeltaMap: Record<number, { dx: number; dy: number }> = {
  1: { dx: -1, dy: 9 },
  2: { dx: -6, dy: 6 },
  3: { dx: -5, dy: 3 },
  4: { dx: -5, dy: 0 },
  5: { dx: -2, dy: -3 },
  6: { dx: 0, dy: -3 },
  7: { dx: 2, dy: -3 },
  8: { dx: 4, dy: 1 },
  9: { dx: 5, dy: 3 },
  10: { dx: 7, dy: 6 },
  11: { dx: 3, dy: 10 },
  12: { dx: 0, dy: 10 },
};

export const AnalogClock: FC<IProps> = ({ date, size = 200 }) => {
  const { config } = useConfig();

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const milliseconds = date.getMilliseconds();

  const hoursAngle = hours * 30 + minutes * 0.5;

  const minutesAngle =
    (minutes + (config.smoothMinutesHand ? seconds / 60 : 0)) * 6;

  const secondsAngle =
    (seconds + (config.smoothSecondsHand ? milliseconds / 1000 : 0)) * 6;

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
          stroke={Color(config.clockBorderColor).rgb().string()}
          strokeWidth={
            config.clockBorderStyle === BorderStyle.DOTTED
              ? 1
              : config.clockBorderStyle === BorderStyle.DASHED
                ? 1
                : config.clockBorderWidth
          }
          strokeDasharray={
            config.clockBorderStyle === BorderStyle.DOTTED
              ? "1, 4"
              : config.clockBorderStyle === BorderStyle.DASHED
                ? "8, 4"
                : "none"
          }
          style={{ zIndex: 100 }}
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
              fill={Color(config.clockDigitsColor).rgb().string()}
              fontSize="10"
              fontWeight="bold"
              dx={numberDeltaMap[number].dx}
              dy={numberDeltaMap[number].dy}
              style={{ zIndex: 5 }}
            >
              {number}
            </text>
          );
        })}

        {Array.from({ length: 60 }, (_, i) => i + 1).map((number) => {
          const angle = number * 6 - 90;
          const x1 = 50 + 40 * Math.cos((angle * Math.PI) / 180);
          const y1 = 50 + 40 * Math.sin((angle * Math.PI) / 180);
          const x2 = 50 + 42 * Math.cos((angle * Math.PI) / 180);
          const y2 = 50 + 42 * Math.sin((angle * Math.PI) / 180);
          const isThick = number % 5 === 0;

          return (
            <line
              key={number}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={Color(config.clockTickMarksColor).rgb().string()}
              strokeWidth={
                (isThick ? 1.5 : 0.5) * config.clockTickMarksWidthMultiplier
              }
              style={{ zIndex: 5 }}
            />
          );
        })}

        <line
          x1="50"
          y1="50"
          x2="50"
          y2="30"
          stroke={Color(config.hoursHandColor).rgb().string()}
          strokeWidth={config.hoursHandWidth}
          transform={`rotate(${hoursAngle} 50 50)`}
          style={{ zIndex: 100 }}
        />

        <line
          x1="50"
          y1="50"
          x2="50"
          y2="20"
          stroke={Color(config.minutesHandColor).rgb().string()}
          strokeWidth={config.minutesHandWidth}
          transform={`rotate(${minutesAngle} 50 50)`}
          style={{ zIndex: 100 }}
        />

        {!config.hideSecondsHand && (
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="10"
            stroke={Color(config.secondsHandColor).rgb().string()}
            strokeWidth={config.secondsHandWidth}
            transform={`rotate(${secondsAngle} 50 50)`}
            style={{ zIndex: 100 }}
          />
        )}

        {!config.hideMillisecondsHand && (
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="10"
            stroke={Color(config.millisecondsHandColor).rgb().string()}
            strokeWidth={config.millisecondsHandWidth}
            transform={`rotate(${millisecondsAngle} 50 50)`}
          />
        )}
      </svg>
    </div>
  );
};
