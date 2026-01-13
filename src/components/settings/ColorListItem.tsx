import {
  Box,
  Button,
  Dialog,
  DialogActions,
  ListItem,
  ListItemText,
} from "@mui/material";
import { type FC, useCallback, useState } from "react";
import type { RgbColor } from "react-colorful";
import { useConfig } from "@/hooks/useConfig";
import { ColorSwatch } from "../shared/ColorSwatch";
import { SettingResetButton } from "./SettingResetButton";

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
    | "clockTickMarksColor"
    | "centerDotColor"
    | "clockFaceGradientStart"
    | "clockFaceGradientEnd"
    | "textGradientStart"
    | "textGradientEnd";
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

  return (
    <ListItem
      sx={{
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "flex-start", sm: "center" },
        gap: { xs: 1, sm: 0 },
        py: 1.5,
      }}
    >
      <ListItemText
        primary={primary}
        secondary={secondary}
        sx={{ flex: 1, minWidth: { xs: "100%", sm: "auto" } }}
      />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          width: { xs: "100%", sm: "auto" },
        }}
      >
        <SettingResetButton configItem={configItem} />

        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          fullWidth={false}
        >
          Change
        </Button>
      </Box>

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
