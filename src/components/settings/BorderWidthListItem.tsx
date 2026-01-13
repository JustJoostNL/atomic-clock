import { ListItem, ListItemText, Slider } from "@mui/material";
import type { FC } from "react";
import { useConfig } from "@/hooks/useConfig";
import { SettingResetButton } from "./SettingResetButton";

export const BorderWidthListItem: FC = () => {
  const { config, updateConfig } = useConfig();

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
        primary="Clock border width"
        secondary="Width of the border around clock"
        sx={{ flex: 1, minWidth: { xs: "100%", sm: "auto" } }}
      />
      <div
        style={{
          width: "100%",
          maxWidth: 300,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <SettingResetButton configItem="clockBorderWidth" />
        <Slider
          value={config.clockBorderWidth}
          min={1}
          max={10}
          step={1}
          valueLabelDisplay="auto"
          onChange={(_, value) =>
            updateConfig({ clockBorderWidth: value as number })
          }
          sx={{ flex: 1 }}
        />
      </div>
    </ListItem>
  );
};
