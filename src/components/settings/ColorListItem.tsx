import React, { FC, useCallback, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  ListItem,
  ListItemText,
} from "@mui/material";
import { RgbColor } from "react-colorful";
import { ColorSwatch } from "../shared/ColorSwatch";
import { defaultConfig } from "@/lib/config/defaultConfig";
import { useConfig } from "@/hooks/useConfig";

interface IProps {
  primary: string;
  secondary: string;
  configItem:
    | "hoursHandColor"
    | "minutesHandColor"
    | "secondsHandColor"
    | "millisecondsHandColor"
    | "textColor"
    | "dateTextColor"
    | "textBackgroundColor"
    | "backgroundColor"
    | "clockDigitsColor"
    | "clockBorderColor"
    | "clockTickMarksColor";
}

export const ColorListItem: FC<IProps> = ({
  primary,
  secondary,
  configItem,
}) => {
  const { config, updateConfig } = useConfig();
  const [open, setOpen] = useState(false);

  const handleColorUpdate = useCallback(
    (newColor: RgbColor) => {
      updateConfig({ [configItem]: newColor });
    },
    [configItem, updateConfig],
  );

  const handleReset = useCallback(() => {
    updateConfig({ [configItem]: defaultConfig[configItem] });
  }, [configItem, updateConfig]);

  return (
    <ListItem>
      <ListItemText primary={primary} secondary={secondary} />

      <Button sx={{ mr: 3 }} onClick={handleReset}>
        Reset
      </Button>

      <Button variant="contained" onClick={() => setOpen(true)}>
        Change
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ColorSwatch
            color={config[configItem]}
            onChange={handleColorUpdate}
          />
        </Box>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </ListItem>
  );
};
