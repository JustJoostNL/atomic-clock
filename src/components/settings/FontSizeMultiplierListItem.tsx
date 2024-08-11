import { ListItem, ListItemText, Slider } from "@mui/material";
import { FC } from "react";
import { SettingResetButton } from "./SettingResetButton";
import { useConfig } from "@/hooks/useConfig";

export const FontSizeMultiplierListItem: FC = () => {
  const { config, updateConfig } = useConfig();

  return (
    <ListItem>
      <ListItemText
        primary="Font size multiplier"
        secondary="Adjust the size of the font"
      />
      <div style={{ width: 300, display: "flex", alignItems: "center" }}>
        <SettingResetButton configItem="fontSizeMultiplier" />

        <Slider
          value={config.fontSizeMultiplier}
          min={0.5}
          max={2}
          step={0.1}
          valueLabelDisplay="auto"
          onChange={(_, value) =>
            updateConfig({
              fontSizeMultiplier: value as number,
            })
          }
        />
      </div>
    </ListItem>
  );
};
