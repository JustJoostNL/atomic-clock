import {
  Box,
  Button,
  Dialog,
  DialogActions,
  ListItem,
  ListItemText,
} from "@mui/material";
import React, { FC, useState } from "react";
import { ColorSwatch } from "../shared/ColorSwatch";
import { useConfig } from "@/hooks/useConfig";
import { defaultConfig } from "@/lib/config/defaultConfig";

export const TextColorListItem: FC = () => {
  const [open, setOpen] = useState(false);
  const { config, updateConfig } = useConfig();

  return (
    <ListItem>
      <ListItemText
        primary="Text color"
        secondary="Changes the color of the clock text"
      />
      <Button
        sx={{ mr: 3 }}
        onClick={() => updateConfig({ textColor: defaultConfig.textColor })}
      >
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
            color={config.textColor}
            onChange={(textColor) => updateConfig({ textColor })}
          />
        </Box>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </ListItem>
  );
};
