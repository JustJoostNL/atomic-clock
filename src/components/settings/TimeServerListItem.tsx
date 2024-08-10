import { ListItem, ListItemText, TextField } from "@mui/material";
import { ChangeEvent, FC, useCallback, useState } from "react";
import { useConfig } from "@/hooks/useConfig";

export const TimeServerListItem: FC = () => {
  const { config, updateConfig } = useConfig();
  const [textValue, setTextValue] = useState(config.timeServer);

  const handleTimeServerChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setTextValue(event.target.value);
    },
    [],
  );

  const handleBlur = useCallback(() => {
    const newValue = textValue
      .trim()
      .replace(/(http:\/\/|https:\/\/|ntp:\/\/)/, "");

    if (newValue === "" || newValue === config.timeServer) {
      setTextValue(config.timeServer);
      return;
    }

    setTextValue(newValue);
    updateConfig({ timeServer: newValue });
  }, [config.timeServer, textValue, updateConfig]);

  return (
    <ListItem>
      <ListItemText
        primary="Time server"
        secondary="The server to use for time synchronization"
      />
      <TextField
        label="Time server"
        value={textValue}
        onChange={handleTimeServerChange}
        onBlur={handleBlur}
      />
    </ListItem>
  );
};
