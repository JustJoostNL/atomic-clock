import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { FC } from "react";
import { ShowMsListItem } from "./ShowMsListItem";
import { FractionalSecondDigitsListItem } from "./FractionalSecondDigitsListItem";
import { TextColorListItem } from "./TextColorListItem";

interface IProps {
  open: boolean;
  onClose: () => void;
}

export const SettingsDialog: FC<IProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Settings</DialogTitle>

      <DialogContent>
        <ShowMsListItem />
        <FractionalSecondDigitsListItem />
        <TextColorListItem />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
