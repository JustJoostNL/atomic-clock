import { RgbColor } from "react-colorful";

export interface IConfig {
  showMilliseconds: boolean;
  fractionalSecondDigits: 1 | 2 | 3;
  textColor: RgbColor;
  fontWeight: 400 | 500 | 700;
  fontSizeMultiplier: number;
  backgroundColor: RgbColor;
  use12HourFormat: boolean;
  useAnalogClock: boolean;
}
