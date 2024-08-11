import { BorderStyle, FontStyle, IConfig } from "./config_types";

export const defaultConfig: IConfig = {
  timeServer: "time.nist.gov",
  timezone: "Europe/Amsterdam",
  showMilliseconds: true,
  fractionalSecondDigits: 3,
  fontWeight: 700,
  fontStyle: FontStyle.NORMAL,
  fontSizeMultiplier: 1,
  hideSeparators: false,
  displayDate: false,
  hideSeconds: false,
  textColor: { r: 255, g: 255, b: 255 },
  backgroundColor: { r: 18, g: 18, b: 18 },
  use12HourFormat: false,
  useAnalogClock: false,
  hideMillisecondsHand: false,
  hideSecondsHand: false,
  smoothSecondsHand: true,
  smoothMinutesHand: false,
  secondsHandColor: { r: 255, g: 255, b: 255 },
  minutesHandColor: { r: 255, g: 255, b: 255 },
  hoursHandColor: { r: 255, g: 255, b: 255 },
  millisecondsHandColor: { r: 255, g: 0, b: 0 },
  clockDigitsColor: { r: 255, g: 255, b: 255 },
  clockBorderColor: { r: 255, g: 255, b: 255 },
  clockTickMarksColor: { r: 255, g: 255, b: 255 },
  secondsHandWidth: 0.5,
  millisecondsHandWidth: 0.5,
  minutesHandWidth: 1,
  hoursHandWidth: 2,
  clockBorderWidth: 3,
  clockTickMarksWidthMultiplier: 1,
  clockBorderStyle: BorderStyle.SOLID,
};
