import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ListSubheader,
  styled,
} from "@mui/material";
import { FC, useCallback } from "react";
import { FontWeightListItem } from "./FontWeightListItem";
import { FontSizeMultiplierListItem } from "./FontSizeMultiplierListItem";
import { ColorListItem } from "./ColorListItem";
import { SettingsSwitchListItem } from "./SettingsSwitchListItem";
import { FractionalSecondDigitsListItem } from "./FractionalSecondDigitsListItem";
import { TimeServerListItem } from "./TimeServerListItem";
import { TimeZoneListItem } from "./TimeZoneListItem";
import { BorderWidthListItem } from "./BorderWidthListItem";
import { useConfig } from "@/hooks/useConfig";
import { defaultConfig } from "@/lib/config/defaultConfig";

const StyledListSubheader = styled(ListSubheader)({
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  position: "static",
  color: "white",
});

interface IProps {
  open: boolean;
  onClose: () => void;
}

export const SettingsDialog: FC<IProps> = ({ open, onClose }) => {
  const { updateConfig } = useConfig();

  const handleResetAll = useCallback(() => {
    if (confirm("Are you sure you want to reset all settings?")) {
      updateConfig(defaultConfig);
    }
  }, [updateConfig]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Settings</DialogTitle>

      <DialogContent sx={{ maxHeight: "calc(100vh - 300px)" }}>
        <StyledListSubheader>General</StyledListSubheader>
        <TimeServerListItem />
        <TimeZoneListItem />

        <StyledListSubheader>Time format</StyledListSubheader>
        <SettingsSwitchListItem
          primary="Show milliseconds"
          secondary="If enabled, milliseconds will be displayed in the clock"
          configItem="showMilliseconds"
        />
        <SettingsSwitchListItem
          primary="Use 12-hour format"
          secondary="If enabled, the clock will use a 12-hour format"
          configItem="use12HourFormat"
        />
        <FractionalSecondDigitsListItem />

        <StyledListSubheader>Appearance</StyledListSubheader>
        <FontSizeMultiplierListItem />
        <FontWeightListItem />
        <ColorListItem
          primary="Text color"
          secondary="Changes the color of the clock text"
          configItem="textColor"
        />
        <ColorListItem
          primary="Background color"
          secondary="Changes the color of the clock background"
          configItem="backgroundColor"
        />

        <StyledListSubheader>Analog Clock</StyledListSubheader>
        <SettingsSwitchListItem
          primary="Use analog clock"
          secondary="If enabled, the clock will be displayed as an analog clock"
          configItem="useAnalogClock"
        />
        <SettingsSwitchListItem
          primary="Hide seconds hand"
          secondary="If enabled, the seconds hand will not be displayed in the clock"
          configItem="hideSecondsHand"
        />
        <SettingsSwitchListItem
          primary="Hide milliseconds hand"
          secondary="If enabled, the milliseconds hand will not be displayed in the clock"
          configItem="hideMillisecondsHand"
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
        <ColorListItem
          primary="Seconds hand color"
          secondary="Changes the color of the seconds hand in the analog clock"
          configItem="secondsHandColor"
        />
        <ColorListItem
          primary="Minutes hand color"
          secondary="Changes the color of the minutes hand in the analog clock"
          configItem="minutesHandColor"
        />
        <ColorListItem
          primary="Hours hand color"
          secondary="Changes the color of the hours hand in the analog clock"
          configItem="hoursHandColor"
        />
        <ColorListItem
          primary="Milliseconds hand color"
          secondary="Changes the color of the milliseconds hand in the analog clock"
          configItem="millisecondsHandColor"
        />
        <ColorListItem
          primary="Clock digits color"
          secondary="Changes the color of the digits in the analog clock"
          configItem="clockDigitsColor"
        />
        <ColorListItem
          primary="Clock border color"
          secondary="Changes the color of the border in the analog clock"
          configItem="clockBorderColor"
        />
        <BorderWidthListItem />
        <ColorListItem
          primary="Clock tick marks color"
          secondary="Changes the color of the tick marks in the analog clock"
          configItem="clockTickMarksColor"
        />
      </DialogContent>

      <DialogActions sx={{ justifyContent: "space-between" }}>
        <Button color="error" onClick={handleResetAll}>
          Reset all settings
        </Button>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
