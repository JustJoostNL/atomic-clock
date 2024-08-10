import { IConfig } from "./config_types";

export const defaultConfig: IConfig = {
  showMilliseconds: true,
  fractionalSecondDigits: 3,
  textColor: { r: 255, g: 255, b: 255 },
  backgroundColor: { r: 18, g: 18, b: 18 },
  use12HourFormat: false,
};
