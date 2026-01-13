"use client";
import { Box } from "@mui/material";
import { ColorListItem } from "../ColorListItem";
import { SettingSection } from "../SettingSection";
import { SettingsSwitchListItem } from "../SettingsSwitchListItem";
import { TimeZoneListItem } from "../TimeZoneListItem";

export function GeneralSettings() {
  return (
    <Box>
      <SettingSection title="Clock Mode">
        <SettingsSwitchListItem
          primary="Use analog clock"
          secondary="Toggle between analog and digital clock display"
          configItem="useAnalogClock"
        />
      </SettingSection>

      <SettingSection title="Time & Location">
        <TimeZoneListItem />
      </SettingSection>

      <SettingSection title="Appearance">
        <ColorListItem
          primary="Background color"
          secondary="Changes the page background color"
          configItem="backgroundColor"
        />
      </SettingSection>
    </Box>
  );
}
