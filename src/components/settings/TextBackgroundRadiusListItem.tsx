import { ListItem, ListItemText, Slider } from "@mui/material";
import { FC } from "react";
import { SettingResetButton } from "./SettingResetButton";
import { useConfig } from "@/hooks/useConfig";

export const TextBackgroundRadiusListItem: FC = () => {
  const { config, updateConfig } = useConfig();

  return (
    <ListItem>
      <ListItemText
        primary="Text background radius"
        secondary="The radius of the background behind the text"
      />
      <div style={{ width: 300, display: "flex", alignItems: "center" }}>
        <SettingResetButton configItem="fontSizeMultiplier" />
        <Slider
          value={config.textBackgroundRadius}
          min={0}
          max={50}
          step={1}
          valueLabelDisplay="auto"
          onChange={(_, value) =>
            updateConfig({
              textBackgroundRadius: value as number,
            })
          }
        />
      </div>
    </ListItem>
  );
};
