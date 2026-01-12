"use client";
import { Box, List, Typography } from "@mui/material";
import { ColorListItem } from "../ColorListItem";
import { TimeZoneListItem } from "../TimeZoneListItem";

export function GeneralSettings() {
  return (
    <Box>
      <Typography variant="h6" component="div" sx={{ mb: 2 }}>
        Server & Location
      </Typography>
      <List disablePadding>
        <TimeZoneListItem />
      </List>

      <Typography variant="h6" component="div" sx={{ mt: 3, mb: 2 }}>
        Background
      </Typography>
      <List disablePadding>
        <ColorListItem
          primary="Background color"
          secondary="Changes the color of the clock background"
          configItem="backgroundColor"
        />
      </List>
    </Box>
  );
}
