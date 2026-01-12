import {
  Autocomplete,
  type AutocompleteChangeDetails,
  type AutocompleteChangeReason,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import { type FC, type SyntheticEvent, useCallback } from "react";
import { useConfig } from "@/hooks/useConfig";
import { timezoneList } from "@/lib/config/config_types";

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
