"use client";
import { Box, ListItem, ListItemText, TextField } from "@mui/material";
import { useConfig } from "@/hooks/useConfig";
import { FontStyle, TextTransform } from "@/lib/config/config_types";
import { ColorListItem } from "../ColorListItem";
import { SelectListItem } from "../SelectListItem";
import { SettingResetButton } from "../SettingResetButton";
import { SettingSection } from "../SettingSection";
import { SettingsSwitchListItem } from "../SettingsSwitchListItem";
import { SliderListItem } from "../SliderListItem";

export function DigitalClockSettings() {
  const { config, updateConfig } = useConfig();

  return (
    <Box>
      <SettingSection title="Display">
        <SettingsSwitchListItem
          primary="12-hour format"
          secondary="Use 12-hour time format instead of 24-hour"
          configItem="use12HourFormat"
        />
        <SettingsSwitchListItem
          primary="Show seconds"
          secondary="Display seconds in the time"
          configItem="hideSeconds"
          inverted
        />
        <SettingsSwitchListItem
          primary="Show milliseconds"
          secondary="Display fractional seconds"
          configItem="showMilliseconds"
        />
        <SelectListItem
          primary="Fractional second digits"
          secondary="Number of decimal places for milliseconds"
          configItem="fractionalSecondDigits"
          options={[
            { value: 1, label: "1 digit" },
            { value: 2, label: "2 digits" },
            { value: 3, label: "3 digits" },
          ]}
        />
        <SettingsSwitchListItem
          primary="Display date"
          secondary="Show the current date below the clock"
          configItem="displayDate"
        />
      </SettingSection>

      <SettingSection title="Separators">
        <SettingsSwitchListItem
          primary="Show separators"
          secondary="Display colons between time units"
          configItem="hideSeparators"
          inverted
        />
        <ListItem
          sx={{
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
            gap: { xs: 1, sm: 0 },
            py: 1.5,
          }}
        >
          <ListItemText
            primary="Custom separator"
            secondary="Custom character for time separator (leave empty for default)"
            sx={{ flex: 1, minWidth: { xs: "100%", sm: "auto" } }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              width: "100%",
              maxWidth: 200,
            }}
          >
            <SettingResetButton configItem="customSeparator" />
            <TextField
              value={config.customSeparator}
              onChange={(e) =>
                updateConfig({ customSeparator: e.target.value })
              }
              inputProps={{ maxLength: 3 }}
              size="small"
              placeholder=":"
              fullWidth
            />
          </div>
        </ListItem>
        <SettingsSwitchListItem
          primary="Blink separators"
          secondary="Animated blinking effect on separators"
          configItem="blinkSeparators"
        />
      </SettingSection>

      <SettingSection title="Typography">
        <SliderListItem
          primary="Font size multiplier"
          secondary="Adjust the size of the font"
          configItem="fontSizeMultiplier"
          min={0.5}
          max={2}
          step={0.1}
        />
        <SelectListItem
          primary="Font weight"
          secondary="Adjust the boldness of the font"
          configItem="fontWeight"
          options={[
            { value: 400, label: "Normal" },
            { value: 500, label: "Medium" },
            { value: 700, label: "Bold" },
          ]}
        />
        <SelectListItem
          primary="Font style"
          secondary="Change the style of the font"
          configItem="fontStyle"
          options={[
            { value: FontStyle.NORMAL, label: "Normal" },
            { value: FontStyle.ITALIC, label: "Italic" },
            { value: FontStyle.OBLIQUE, label: "Oblique" },
          ]}
        />
        <SliderListItem
          primary="Letter spacing"
          secondary="Adjust the spacing between characters"
          configItem="letterSpacing"
          min={-0.2}
          max={0.5}
          step={0.01}
        />
        <SelectListItem
          primary="Text transform"
          secondary="Change the case of displayed text"
          configItem="textTransform"
          options={[
            { value: TextTransform.NONE, label: "None" },
            { value: TextTransform.UPPERCASE, label: "Uppercase" },
            { value: TextTransform.LOWERCASE, label: "Lowercase" },
            { value: TextTransform.CAPITALIZE, label: "Capitalize" },
          ]}
        />
      </SettingSection>

      <SettingSection title="Colors">
        <SettingsSwitchListItem
          primary="Text gradient"
          secondary="Apply gradient effect to the text"
          configItem="textGradient"
        />
        <ColorListItem
          primary="Text color"
          secondary="Main text color"
          configItem="textColor"
        />
        <ColorListItem
          primary="Gradient start"
          secondary="Starting color for text gradient"
          configItem="textGradientStart"
        />
        <ColorListItem
          primary="Gradient end"
          secondary="Ending color for text gradient"
          configItem="textGradientEnd"
        />
        <ColorListItem
          primary="Date color"
          secondary="Color for the date text"
          configItem="dateTextColor"
        />
      </SettingSection>

      <SettingSection title="Background">
        <ColorListItem
          primary="Background color"
          secondary="Text background color"
          configItem="textBackgroundColor"
        />
        <SliderListItem
          primary="Background opacity"
          secondary="Opacity of background behind text"
          configItem="textBackgroundOpacity"
          min={0}
          max={1}
          step={0.1}
        />
        <SliderListItem
          primary="Background radius"
          secondary="Border radius of text background"
          configItem="textBackgroundRadius"
          min={0}
          max={50}
          step={1}
        />
      </SettingSection>

      <SettingSection title="Effects">
        <SliderListItem
          primary="Text glow"
          secondary="Add glowing effect to text"
          configItem="textGlowIntensity"
          min={0}
          max={10}
          step={0.5}
        />
        <SliderListItem
          primary="Text shadow"
          secondary="Add shadow depth to text"
          configItem="textShadowIntensity"
          min={0}
          max={10}
          step={0.5}
        />
      </SettingSection>

      <SettingSection title="Animations">
        <SettingsSwitchListItem
          primary="Pulse animation"
          secondary="Subtle breathing effect"
          configItem="pulseAnimation"
        />
        <SliderListItem
          primary="Pulse speed"
          secondary="Animation speed"
          configItem="pulseSpeed"
          min={0.1}
          max={3}
          step={0.1}
        />
        <SliderListItem
          primary="Transition speed"
          secondary="Visual transition speed"
          configItem="transitionSpeed"
          min={0.1}
          max={3}
          step={0.1}
        />
      </SettingSection>
    </Box>
  );
}
