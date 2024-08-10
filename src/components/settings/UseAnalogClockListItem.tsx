import { ListItem, ListItemText, Switch } from "@mui/material";
import { FC } from "react";
import { useConfig } from "@/hooks/useConfig";

export const UseAnalogClockListItem: FC = () => {
  const { config, updateConfig } = useConfig();

  return (
    <ListItem>
      <ListItemText
        primary="Use analog clock"
        secondary="If enabled, an analog clock will be displayed"
      />
      <Switch
        checked={config.useAnalogClock}
        onChange={() =>
          updateConfig({ useAnalogClock: !config.useAnalogClock })
        }
      />
    </ListItem>
  );
};
