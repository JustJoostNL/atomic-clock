import { ListItem, ListItemText, Slider } from "@mui/material";
import type { FC } from "react";
import { useConfig } from "@/hooks/useConfig";
import { SettingResetButton } from "./SettingResetButton";

export const TextBackgroundOpacityListItem: FC = () => {
  const { config, updateConfig } = useConfig();

  return (
    <ListItem>
      <ListItemText
        primary="Text background opacity"
        secondary="The opacity of the background behind the text"
      />
      <div style={{ width: 300, display: "flex", alignItems: "center" }}>
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
        />
      </div>
    </ListItem>
  );
};
