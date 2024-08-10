import { RgbColor } from "react-colorful";

export const timezoneList = Intl.supportedValuesOf("timeZone");

export interface IConfig {
  timeServer: string;
  timezone: (typeof timezoneList)[number];
  showMilliseconds: boolean;
  fractionalSecondDigits: 1 | 2 | 3;
  textColor: RgbColor;
  fontWeight: 400 | 500 | 700;
  fontSizeMultiplier: number;
  backgroundColor: RgbColor;
  use12HourFormat: boolean;
  useAnalogClock: boolean;
  smoothSecondsHand: boolean;
  hideMillisecondsHand: boolean;
  hideSecondsHand: boolean;
  secondsHandColor: RgbColor;
  minutesHandColor: RgbColor;
  hoursHandColor: RgbColor;
  millisecondsHandColor: RgbColor;
  clockDigitsColor: RgbColor;
  clockBorderColor: RgbColor;
  clockTickMarksColor: RgbColor;
}
