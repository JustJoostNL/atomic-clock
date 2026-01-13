import { ListItem, ListItemText, Slider } from "@mui/material";
import { type FC, useCallback } from "react";
import { useConfig } from "@/hooks/useConfig";
import { SettingResetButton } from "./SettingResetButton";

interface IProps {
  primary: string;
  secondary: string;
  configItem:
    | "secondsHandWidth"
    | "minutesHandWidth"
    | "hoursHandWidth"
    | "millisecondsHandWidth";
}

export const HandWidthListItem: FC<IProps> = ({
  primary,
  secondary,
  configItem,
}) => {
  const { config, updateConfig } = useConfig();

  const handleChange = useCallback(
    (_ev: Event, value: number | number[]) => {
      updateConfig({ [configItem]: value as number });
    },
    [configItem, updateConfig],
  );

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
        primary={primary}
        secondary={secondary}
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
        <SettingResetButton configItem={configItem} />
        <Slider
          value={config[configItem]}
          min={0.3}
          max={5}
          step={0.1}
          valueLabelDisplay="auto"
          onChange={handleChange}
          sx={{ flex: 1 }}
        />
      </div>
    </ListItem>
  );
};
