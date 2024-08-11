import { ListItem, ListItemText, Select, MenuItem } from "@mui/material";
import { FC } from "react";
import { useConfig } from "@/hooks/useConfig";
import { BorderStyle } from "@/lib/config/config_types";

export const BorderStyleListItem: FC = () => {
  const { config, updateConfig } = useConfig();

  return (
    <ListItem>
      <ListItemText
        primary="Clock border style"
        secondary="The style of the border around the clock"
      />
      <Select
        value={config.clockBorderStyle}
        onChange={(e) =>
          updateConfig({
            clockBorderStyle: e.target.value as BorderStyle,
          })
        }
      >
        {Object.values(BorderStyle).map((style) => (
          <MenuItem key={style} value={style}>
            {style.charAt(0).toUpperCase() + style.slice(1)}
          </MenuItem>
        ))}
      </Select>
    </ListItem>
  );
};
