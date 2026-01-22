import type { RgbColor } from "react-colorful";

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

export enum HandShape {
  STRAIGHT = "straight",
  ARROW = "arrow",
  TRIANGLE = "triangle",
  ROUNDED = "rounded",
}

export enum TextTransform {
  NONE = "none",
  UPPERCASE = "uppercase",
  LOWERCASE = "lowercase",
  CAPITALIZE = "capitalize",
}

export interface IConfig {
  timezone: (typeof timezoneList)[number];
  showMilliseconds: boolean;
  fractionalSecondDigits: 1 | 2 | 3;
  textColor: RgbColor;
  dateTextColor: RgbColor;
  textBackgroundColor: RgbColor;
  textBackgroundOpacity: number;
  textBackgroundRadius: number;
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
  // Analog Clock Enhancements
  useRomanNumerals: boolean;
  hideClockNumbers: boolean;
  reverseRotation: boolean;
  clockHandShape: HandShape;
  showCenterDot: boolean;
  centerDotColor: RgbColor;
  centerDotSize: number;
  clockFaceGradient: boolean;
  clockFaceGradientStart: RgbColor;
  clockFaceGradientEnd: RgbColor;
  handGlowIntensity: number;
  handShadowIntensity: number;
  // Digital Clock Enhancements
  textGlowIntensity: number;
  textShadowIntensity: number;
  textGradient: boolean;
  textGradientStart: RgbColor;
  textGradientEnd: RgbColor;
  letterSpacing: number;
  textTransform: TextTransform;
  customSeparator: string;
  pulseAnimation: boolean;
  pulseSpeed: number;
  blinkSeparators: boolean;
  // Animation Settings
  transitionSpeed: number;
}
