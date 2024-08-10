import { IConfig } from "./config_types";

export const defaultConfig: IConfig = {
  showMilliseconds: true,
  fractionalSecondDigits: 3,
  fontWeight: 700,
  fontSizeMultiplier: 1,
  textColor: { r: 255, g: 255, b: 255 },
  backgroundColor: { r: 18, g: 18, b: 18 },
  use12HourFormat: false,
  useAnalogClock: false,
  hideMillisecondsHand: false,
  hideSecondsHand: false,
  smoothSecondsHand: true,
  secondsHandColor: { r: 255, g: 255, b: 255 },
  minutesHandColor: { r: 255, g: 255, b: 255 },
  hoursHandColor: { r: 255, g: 255, b: 255 },
  millisecondsHandColor: { r: 255, g: 0, b: 0 },
  clockDigitsColor: { r: 255, g: 255, b: 255 },
};
