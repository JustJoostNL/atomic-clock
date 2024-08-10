import { FC, useCallback } from "react";
import {
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { timezoneList } from "@/lib/config/config_types";
import { useConfig } from "@/hooks/useConfig";

export const TimeZoneListItem: FC = () => {
  const { config, updateConfig } = useConfig();

  const handleTimezoneChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      updateConfig({ timezone: event.target.value as string });
    },
    [updateConfig],
  );

  return (
    <ListItem>
      <ListItemText
        primary="Timezone"
        secondary="The timezone to use for time synchronization"
      />
      <Select
        label="Timezone"
        value={config.timezone}
        onChange={handleTimezoneChange}
      >
        {timezoneList.map((timezone) => (
          <MenuItem key={timezone} value={timezone}>
            {timezone}
          </MenuItem>
        ))}
      </Select>
    </ListItem>
  );
};
