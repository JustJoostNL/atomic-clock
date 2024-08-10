import { RgbColor } from "react-colorful";

export interface IConfig {
  showMilliseconds: boolean;
  fractionalSecondDigits: 1 | 2 | 3;
  textColor: RgbColor;
}
