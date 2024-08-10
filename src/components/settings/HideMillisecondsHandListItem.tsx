import { ListItem, ListItemText, Switch } from "@mui/material";
import { FC } from "react";
import { useConfig } from "@/hooks/useConfig";

export const HideMillisecondsHandListItem: FC = () => {
  const { config, updateConfig } = useConfig();

  return (
    <ListItem>
      <ListItemText
        primary="Hide milliseconds hand"
        secondary="If enabled, the milliseconds hand will not be displayed in the clock"
      />
      <Switch
        checked={config.hideMillisecondsHand}
        onChange={() =>
          updateConfig({ hideMillisecondsHand: !config.hideMillisecondsHand })
        }
      />
    </ListItem>
  );
};
