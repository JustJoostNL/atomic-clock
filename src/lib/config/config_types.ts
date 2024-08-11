import { RgbColor } from "react-colorful";

export const timezoneList = Intl.supportedValuesOf("timeZone");

export enum BorderStyle {
  SOLID = "solid",
  DASHED = "dashed",
  DOTTED = "dotted",
}

export enum FontStyle {
  NORMAL = "normal",
  ITALIC = "italic",
  OBLIQUE = "oblique",
}

export interface IConfig {
  timeServer: string;
  timezone: (typeof timezoneList)[number];
  showMilliseconds: boolean;
  fractionalSecondDigits: 1 | 2 | 3;
  textColor: RgbColor;
  fontWeight: 400 | 500 | 700;
  fontStyle: FontStyle;
  fontSizeMultiplier: number;
  hideSeparators: boolean;
  displayDate: boolean;
  hideSeconds: boolean;
  backgroundColor: RgbColor;
  use12HourFormat: boolean;
  useAnalogClock: boolean;
  smoothSecondsHand: boolean;
  smoothMinutesHand: boolean;
  hideMillisecondsHand: boolean;
  hideSecondsHand: boolean;
  secondsHandColor: RgbColor;
  minutesHandColor: RgbColor;
  hoursHandColor: RgbColor;
  millisecondsHandColor: RgbColor;
  secondsHandWidth: number;
  minutesHandWidth: number;
  hoursHandWidth: number;
  millisecondsHandWidth: number;
  clockDigitsColor: RgbColor;
  clockBorderColor: RgbColor;
  clockBorderWidth: number;
  clockBorderStyle: BorderStyle;
  clockTickMarksColor: RgbColor;
  clockTickMarksWidthMultiplier: number;
}
