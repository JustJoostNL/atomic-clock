import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ListSubheader,
  styled,
} from "@mui/material";
import { FC } from "react";
import { ShowMsListItem } from "./ShowMsListItem";
import { FractionalSecondDigitsListItem } from "./FractionalSecondDigitsListItem";
import { TextColorListItem } from "./TextColorListItem";
import { BackgroundColorListItem } from "./BackgroundColorListItem";
import { Use12HourFormatListItem } from "./Use12HourFormatListItem";
import { FontWeightListItem } from "./FontWeightListItem";
import { FontSizeMultiplierListItem } from "./FontSizeMultiplierListItem";
import { UseAnalogClockListItem } from "./UseAnalogClockListItem";
import { HideMillisecondsHandListItem } from "./HideMillisecondsHandListItem";
import { HideSecondsHand } from "./HideSecondsHand";

const StyledListSubheader = styled(ListSubheader)({
  backgroundColor: "rgba(0, 0, 0, 0.5)",
});

interface IProps {
  open: boolean;
  onClose: () => void;
}

export const SettingsDialog: FC<IProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Settings</DialogTitle>

      <DialogContent>
        <StyledListSubheader>Time format</StyledListSubheader>
        <ShowMsListItem />
        <Use12HourFormatListItem />
        <FractionalSecondDigitsListItem />

        <StyledListSubheader>Appearance</StyledListSubheader>
        <FontSizeMultiplierListItem />
        <FontWeightListItem />
        <TextColorListItem />
        <BackgroundColorListItem />

        <StyledListSubheader>Analog Clock</StyledListSubheader>
        <UseAnalogClockListItem />
        <HideSecondsHand />
        <HideMillisecondsHandListItem />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
