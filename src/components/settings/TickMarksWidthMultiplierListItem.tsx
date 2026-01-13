import { ListItem, ListItemText, Slider } from "@mui/material";
import type { FC } from "react";
import { useConfig } from "@/hooks/useConfig";
import { SettingResetButton } from "./SettingResetButton";

export const TickMarksWidthMultiplierListItem: FC = () => {
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
        primary="Tick marks width"
        secondary="Adjust width of tick marks"
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
          sx={{ flex: 1 }}
        />
      </div>
    </ListItem>
  );
};
