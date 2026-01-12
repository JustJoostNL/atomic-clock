import { ListItem, ListItemText, Slider } from "@mui/material";
import type { FC } from "react";
import { useConfig } from "@/hooks/useConfig";
import { SettingResetButton } from "./SettingResetButton";

export const TickMarksWidthMultiplierListItem: FC = () => {
  const { config, updateConfig } = useConfig();

  return (
    <ListItem>
      <ListItemText
        primary="Tick marks width multiplier"
        secondary="Adjust the width of the tick marks"
      />
      <div style={{ width: 300, display: "flex", alignItems: "center" }}>
        <SettingResetButton configItem="clockTickMarksWidthMultiplier" />
        <Slider
          value={config.clockTickMarksWidthMultiplier}
          min={0.5}
          max={3}
          step={0.1}
          valueLabelDisplay="auto"
          onChange={(_, value) =>
            updateConfig({ clockTickMarksWidthMultiplier: value as number })
          }
        />
      </div>
    </ListItem>
  );
};
