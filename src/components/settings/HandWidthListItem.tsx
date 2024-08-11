import { ListItem, ListItemText, Slider } from "@mui/material";
import { FC, useCallback } from "react";
import { useConfig } from "@/hooks/useConfig";

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
    <ListItem>
      <ListItemText primary={primary} secondary={secondary} />
      <div style={{ width: 200 }}>
        <Slider
          value={config[configItem]}
          min={0.3}
          max={5}
          step={0.1}
          valueLabelDisplay="auto"
          onChange={handleChange}
        />
      </div>
    </ListItem>
  );
};
