"use client";
import { Box } from "@mui/material";
import { BorderStyle, HandShape } from "@/lib/config/config_types";
import { ColorListItem } from "../ColorListItem";
import { SelectListItem } from "../SelectListItem";
import { SettingSection } from "../SettingSection";
import { SettingsSwitchListItem } from "../SettingsSwitchListItem";
import { SliderListItem } from "../SliderListItem";

export function AnalogClockSettings() {
  return (
    <Box>
      <SettingSection title="Clock Behavior">
        <SettingsSwitchListItem
          primary="Smooth seconds hand"
          secondary="Continuous movement instead of ticking"
          configItem="smoothSecondsHand"
        />
        <SettingsSwitchListItem
          primary="Smooth minutes hand"
          secondary="Continuous movement of minutes hand"
          configItem="smoothMinutesHand"
        />
        <SettingsSwitchListItem
          primary="Show seconds hand"
          secondary="Display the seconds hand"
          configItem="hideSecondsHand"
          inverted
        />
        <SettingsSwitchListItem
          primary="Show milliseconds hand"
          secondary="Display the milliseconds hand"
          configItem="hideMillisecondsHand"
          inverted
        />
        <SettingsSwitchListItem
          primary="Reverse rotation"
          secondary="Counter-clockwise rotation"
          configItem="reverseRotation"
        />
      </SettingSection>

      <SettingSection title="Clock Face">
        <SettingsSwitchListItem
          primary="Roman numerals"
          secondary="Use Roman numerals instead of Arabic"
          configItem="useRomanNumerals"
        />
        <SettingsSwitchListItem
          primary="Show numbers"
          secondary="Display numbers on the clock face"
          configItem="hideClockNumbers"
          inverted
        />
        <SettingsSwitchListItem
          primary="Clock face gradient"
          secondary="Apply custom gradient to clock face"
          configItem="clockFaceGradient"
        />
        <ColorListItem
          primary="Gradient start"
          secondary="Starting color of gradient"
          configItem="clockFaceGradientStart"
        />
        <ColorListItem
          primary="Gradient end"
          secondary="Ending color of gradient"
          configItem="clockFaceGradientEnd"
        />
        <ColorListItem
          primary="Digits color"
          secondary="Color of the hour numbers"
          configItem="clockDigitsColor"
        />
      </SettingSection>

      <SettingSection title="Border & Tick Marks">
        <ColorListItem
          primary="Border color"
          secondary="Clock border color"
          configItem="clockBorderColor"
        />
        <SliderListItem
          primary="Border width"
          secondary="Width of the clock border"
          configItem="clockBorderWidth"
          min={1}
          max={10}
          step={1}
        />
        <SelectListItem
          primary="Border style"
          secondary="Style of the clock border"
          configItem="clockBorderStyle"
          options={[
            { value: BorderStyle.SOLID, label: "Solid" },
            { value: BorderStyle.DASHED, label: "Dashed" },
            { value: BorderStyle.DOTTED, label: "Dotted" },
          ]}
        />
        <ColorListItem
          primary="Tick marks color"
          secondary="Color of the minute/hour marks"
          configItem="clockTickMarksColor"
        />
        <SliderListItem
          primary="Tick marks width"
          secondary="Width multiplier for tick marks"
          configItem="clockTickMarksWidthMultiplier"
          min={0.5}
          max={3}
          step={0.1}
        />
      </SettingSection>

      <SettingSection title="Hands Appearance">
        <SelectListItem
          primary="Hand shape"
          secondary="Visual style of clock hands"
          configItem="clockHandShape"
          options={[
            { value: HandShape.STRAIGHT, label: "Straight" },
            { value: HandShape.ARROW, label: "Arrow" },
            { value: HandShape.TRIANGLE, label: "Triangle" },
            { value: HandShape.ROUNDED, label: "Rounded" },
          ]}
        />
        <SliderListItem
          primary="Hand glow"
          secondary="Glowing effect around hands"
          configItem="handGlowIntensity"
          min={0}
          max={10}
          step={0.5}
        />
        <SliderListItem
          primary="Hand shadow"
          secondary="Shadow depth of hands"
          configItem="handShadowIntensity"
          min={0}
          max={10}
          step={0.5}
        />
      </SettingSection>

      <SettingSection title="Hand Widths">
        <SliderListItem
          primary="Hours hand"
          secondary="Width of hours hand"
          configItem="hoursHandWidth"
          min={0.3}
          max={5}
          step={0.1}
        />
        <SliderListItem
          primary="Minutes hand"
          secondary="Width of minutes hand"
          configItem="minutesHandWidth"
          min={0.3}
          max={5}
          step={0.1}
        />
        <SliderListItem
          primary="Seconds hand"
          secondary="Width of seconds hand"
          configItem="secondsHandWidth"
          min={0.3}
          max={5}
          step={0.1}
        />
        <SliderListItem
          primary="Milliseconds hand"
          secondary="Width of milliseconds hand"
          configItem="millisecondsHandWidth"
          min={0.3}
          max={5}
          step={0.1}
        />
      </SettingSection>

      <SettingSection title="Hand Colors">
        <ColorListItem
          primary="Hours hand"
          secondary="Color of hours hand"
          configItem="hoursHandColor"
        />
        <ColorListItem
          primary="Minutes hand"
          secondary="Color of minutes hand"
          configItem="minutesHandColor"
        />
        <ColorListItem
          primary="Seconds hand"
          secondary="Color of seconds hand"
          configItem="secondsHandColor"
        />
        <ColorListItem
          primary="Milliseconds hand"
          secondary="Color of milliseconds hand"
          configItem="millisecondsHandColor"
        />
      </SettingSection>

      <SettingSection title="Center Dot">
        <SettingsSwitchListItem
          primary="Show center dot"
          secondary="Display dot at clock center"
          configItem="showCenterDot"
        />
        <ColorListItem
          primary="Dot color"
          secondary="Center dot color"
          configItem="centerDotColor"
        />
        <SliderListItem
          primary="Center dot size"
          secondary="Size of the center dot"
          configItem="centerDotSize"
          min={0}
          max={20}
          step={1}
        />
      </SettingSection>

      <SettingSection title="Animations">
        <SliderListItem
          primary="Transition speed"
          secondary="Visual transition speed"
          configItem="transitionSpeed"
          min={0.1}
          max={5}
          step={0.1}
        />
      </SettingSection>
    </Box>
  );
}
