"use client";
import { Box, List, Typography } from "@mui/material";
import { BorderStyleListItem } from "../BorderStyleListItem";
import { BorderWidthListItem } from "../BorderWidthListItem";
import { ColorListItem } from "../ColorListItem";
import { HandWidthListItem } from "../HandWidthListItem";
import { SettingsSwitchListItem } from "../SettingsSwitchListItem";
import { TickMarksWidthMultiplierListItem } from "../TickMarksWidthMultiplierListItem";

export function AnalogClockSettings() {
  return (
    <Box>
      <Typography variant="h6" component="div" sx={{ mb: 2 }}>
        Clock Options
      </Typography>
      <List disablePadding>
        <SettingsSwitchListItem
          primary="Use analog clock"
          secondary="If enabled, the clock will be displayed as an analog clock"
          configItem="useAnalogClock"
        />
        <SettingsSwitchListItem
          primary="Smooth seconds hand"
          secondary="If enabled, the seconds hand will move smoothly"
          configItem="smoothSecondsHand"
        />
        <SettingsSwitchListItem
          primary="Smooth minutes hand"
          secondary="If enabled, the minutes hand will move smoothly"
          configItem="smoothMinutesHand"
        />
        <SettingsSwitchListItem
          primary="Hide seconds hand"
          secondary="If enabled, the seconds hand will not be displayed"
          configItem="hideSecondsHand"
        />
        <SettingsSwitchListItem
          primary="Hide milliseconds hand"
          secondary="If enabled, the milliseconds hand will not be displayed"
          configItem="hideMillisecondsHand"
        />
      </List>

      <Typography variant="h6" component="div" sx={{ mt: 3, mb: 2 }}>
        Hand Widths
      </Typography>
      <List disablePadding>
        <HandWidthListItem
          primary="Hours hand width"
          secondary="Changes the width of the hours hand"
          configItem="hoursHandWidth"
        />
        <HandWidthListItem
          primary="Minutes hand width"
          secondary="Changes the width of the minutes hand"
          configItem="minutesHandWidth"
        />
        <HandWidthListItem
          primary="Seconds hand width"
          secondary="Changes the width of the seconds hand"
          configItem="secondsHandWidth"
        />
        <HandWidthListItem
          primary="Milliseconds hand width"
          secondary="Changes the width of the milliseconds hand"
          configItem="millisecondsHandWidth"
        />
      </List>

      <Typography variant="h6" component="div" sx={{ mt: 3, mb: 2 }}>
        Hand Colors
      </Typography>
      <List disablePadding>
        <ColorListItem
          primary="Hours hand color"
          secondary="Changes the color of the hours hand"
          configItem="hoursHandColor"
        />
        <ColorListItem
          primary="Minutes hand color"
          secondary="Changes the color of the minutes hand"
          configItem="minutesHandColor"
        />
        <ColorListItem
          primary="Seconds hand color"
          secondary="Changes the color of the seconds hand"
          configItem="secondsHandColor"
        />
        <ColorListItem
          primary="Milliseconds hand color"
          secondary="Changes the color of the milliseconds hand"
          configItem="millisecondsHandColor"
        />
      </List>

      <Typography variant="h6" component="div" sx={{ mt: 3, mb: 2 }}>
        Clock Face
      </Typography>
      <List disablePadding>
        <ColorListItem
          primary="Clock digits color"
          secondary="Changes the color of the digits"
          configItem="clockDigitsColor"
        />
        <ColorListItem
          primary="Clock border color"
          secondary="Changes the color of the border"
          configItem="clockBorderColor"
        />
        <BorderWidthListItem />
        <BorderStyleListItem />
        <ColorListItem
          primary="Clock tick marks color"
          secondary="Changes the color of the tick marks"
          configItem="clockTickMarksColor"
        />
        <TickMarksWidthMultiplierListItem />
      </List>
    </Box>
  );
}
