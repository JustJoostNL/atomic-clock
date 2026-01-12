"use client";
import { Box, List, Typography } from "@mui/material";
import { ColorListItem } from "../ColorListItem";
import { FontSizeMultiplierListItem } from "../FontSizeMultiplierListItem";
import { FontStyleListItem } from "../FontStyleListItem";
import { FontWeightListItem } from "../FontWeightListItem";
import { FractionalSecondDigitsListItem } from "../FractionalSecondDigitsListItem";
import { SettingsSwitchListItem } from "../SettingsSwitchListItem";
import { TextBackgroundOpacityListItem } from "../TextBackgroundOpacityListItem";
import { TextBackgroundRadiusListItem } from "../TextBackgroundRadiusListItem";

export function DigitalClockSettings() {
  return (
    <Box>
      <Typography variant="h6" component="div" sx={{ mb: 2 }}>
        Display Options
      </Typography>
      <List disablePadding>
        <SettingsSwitchListItem
          primary="Use 12-hour format"
          secondary="If enabled, the clock will use a 12-hour format"
          configItem="use12HourFormat"
        />
        <SettingsSwitchListItem
          primary="Hide seconds"
          secondary="If enabled, seconds will not be displayed in the clock"
          configItem="hideSeconds"
        />
        <SettingsSwitchListItem
          primary="Show milliseconds"
          secondary="If enabled, milliseconds will be displayed in the clock"
          configItem="showMilliseconds"
        />
        <FractionalSecondDigitsListItem />
        <SettingsSwitchListItem
          primary="Hide separators"
          secondary="If enabled, separators between hours, minutes, and seconds will be hidden"
          configItem="hideSeparators"
        />
        <SettingsSwitchListItem
          primary="Display date"
          secondary="If enabled, the current date will be displayed below the clock"
          configItem="displayDate"
        />
      </List>

      <Typography variant="h6" component="div" sx={{ mt: 3, mb: 2 }}>
        Typography
      </Typography>
      <List disablePadding>
        <FontSizeMultiplierListItem />
        <FontWeightListItem />
        <FontStyleListItem />
      </List>

      <Typography variant="h6" component="div" sx={{ mt: 3, mb: 2 }}>
        Colors
      </Typography>
      <List disablePadding>
        <ColorListItem
          primary="Text color"
          secondary="Changes the color of the clock text"
          configItem="textColor"
        />
        <ColorListItem
          primary="Date text color"
          secondary="Changes the color of the date text"
          configItem="dateTextColor"
        />
        <ColorListItem
          primary="Text background color"
          secondary="Changes the color of the text background"
          configItem="textBackgroundColor"
        />
        <TextBackgroundOpacityListItem />
        <TextBackgroundRadiusListItem />
      </List>
    </Box>
  );
}
