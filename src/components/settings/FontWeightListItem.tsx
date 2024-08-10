import { ListItem, ListItemText, Select, MenuItem } from "@mui/material";
import { FC } from "react";
import { useConfig } from "@/hooks/useConfig";
import { IConfig } from "@/lib/config/config_types";

export const FontWeightListItem: FC = () => {
  const { config, updateConfig } = useConfig();

  return (
    <ListItem>
      <ListItemText
        primary="Font weight"
        secondary="The font weight of the clock"
      />
      <Select
        value={config.fontWeight}
        onChange={(e) =>
          updateConfig({ fontWeight: e.target.value as IConfig["fontWeight"] })
        }
      >
        <MenuItem value={400}>Regular</MenuItem>
        <MenuItem value={500}>Medium</MenuItem>
        <MenuItem value={700}>Bold</MenuItem>
      </Select>
    </ListItem>
  );
};
