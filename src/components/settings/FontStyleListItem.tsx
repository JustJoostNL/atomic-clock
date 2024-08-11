import { ListItem, ListItemText, MenuItem, Select } from "@mui/material";
import { FC } from "react";
import { useConfig } from "@/hooks/useConfig";
import { FontStyle } from "@/lib/config/config_types";

export const FontStyleListItem: FC = () => {
  const { config, updateConfig } = useConfig();

  return (
    <ListItem>
      <ListItemText
        primary="Font style"
        secondary="The style of the font used in the digital clock"
      />
      <Select
        value={config.fontStyle}
        onChange={(e) =>
          updateConfig({
            fontStyle: e.target.value as FontStyle,
          })
        }
      >
        {Object.values(FontStyle).map((style) => (
          <MenuItem key={style} value={style}>
            {style.charAt(0).toUpperCase() + style.slice(1)}
          </MenuItem>
        ))}
      </Select>
    </ListItem>
  );
};
