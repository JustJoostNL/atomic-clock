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

export const BackgroundColorListItem: FC = () => {
  const [open, setOpen] = useState(false);
  const { config, updateConfig } = useConfig();

  return (
    <ListItem>
      <ListItemText
        primary="Background Color"
        secondary="Changes the background color of the clock"
      />
      <Button
        sx={{ mr: 3 }}
        onClick={() =>
          updateConfig({ backgroundColor: defaultConfig.backgroundColor })
        }
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
            color={config.backgroundColor}
            onChange={(backgroundColor) => updateConfig({ backgroundColor })}
          />
        </Box>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </ListItem>
  );
};
