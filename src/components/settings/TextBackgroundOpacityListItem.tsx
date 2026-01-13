import { ListItem, ListItemText, Slider } from "@mui/material";
import type { FC } from "react";
import { useConfig } from "@/hooks/useConfig";
import { SettingResetButton } from "./SettingResetButton";

export const TextBackgroundOpacityListItem: FC = () => {
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
        primary="Text background opacity"
        secondary="Opacity of background behind text"
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
        <SettingResetButton configItem="textBackgroundOpacity" />
        <Slider
          value={config.textBackgroundOpacity}
          min={0}
          max={1}
          step={0.1}
          valueLabelDisplay="auto"
          onChange={(_, value) =>
            updateConfig({ textBackgroundOpacity: value as number })
          }
          sx={{ flex: 1 }}
        />
      </div>
    </ListItem>
  );
};
