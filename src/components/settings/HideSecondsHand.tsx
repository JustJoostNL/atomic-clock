import { ListItem, ListItemText, Switch } from "@mui/material";
import { FC } from "react";
import { useConfig } from "@/hooks/useConfig";

export const HideSecondsHand: FC = () => {
  const { config, updateConfig } = useConfig();

  return (
    <ListItem>
      <ListItemText
        primary="Hide seconds hand"
        secondary="If enabled, the seconds hand will not be displayed in the clock"
      />
      <Switch
        checked={config.hideSecondsHand}
        onChange={() =>
          updateConfig({ hideSecondsHand: !config.hideSecondsHand })
        }
      />
    </ListItem>
  );
};
