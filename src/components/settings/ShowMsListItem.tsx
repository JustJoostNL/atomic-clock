import { ListItem, ListItemText, Switch } from "@mui/material";
import React, { FC } from "react";
import { useConfig } from "@/hooks/useConfig";

export const ShowMsListItem: FC = () => {
  const { config, updateConfig } = useConfig();

  return (
    <ListItem>
      <ListItemText
        primary="Show milliseconds"
        secondary="If enabled, milliseconds will be displayed in the clock"
      />
      <Switch
        checked={config.showMs}
        onChange={() => updateConfig({ showMs: !config.showMs })}
      />
    </ListItem>
  );
};
