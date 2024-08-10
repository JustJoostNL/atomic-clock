import { ListItem, ListItemText, Switch } from "@mui/material";
import { FC } from "react";
import { useConfig } from "@/hooks/useConfig";

export const Use12HourFormatListItem: FC = () => {
  const { config, updateConfig } = useConfig();

  return (
    <ListItem>
      <ListItemText
        primary="Use 12-hour format"
        secondary="If enabled, the clock will use 12-hour format"
      />
      <Switch
        checked={config.use12HourFormat}
        onChange={() =>
          updateConfig({ use12HourFormat: !config.use12HourFormat })
        }
      />
    </ListItem>
  );
};
