import { FC, SyntheticEvent, useCallback } from "react";
import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import { timezoneList } from "@/lib/config/config_types";
import { useConfig } from "@/hooks/useConfig";

export const TimeZoneListItem: FC = () => {
  const { config, updateConfig } = useConfig();

  const handleTimezoneChange = useCallback(
    (
      _ev: SyntheticEvent<Element, Event>,
      value: string | null,
      reason: AutocompleteChangeReason,
      _dt?: AutocompleteChangeDetails<string> | undefined,
    ) => {
      if (reason === "selectOption" && value) {
        updateConfig({ timezone: value });
      }
    },
    [updateConfig],
  );

  return (
    <ListItem>
      <ListItemText
        primary="Timezone"
        secondary="The timezone to use for time synchronization"
      />
      <Autocomplete
        value={config.timezone}
        onChange={handleTimezoneChange}
        options={timezoneList}
        fullWidth
        autoHighlight
        disableClearable
        groupBy={(option) => option.split("/")[0]}
        autoSelect
        autoComplete
        sx={{ maxWidth: 250 }}
        renderInput={(params) => <TextField {...params} />}
      />
    </ListItem>
  );
};
