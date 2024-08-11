import {
  IconButton,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { ChangeEvent, FC, useCallback, useState } from "react";
import { InfoRounded } from "@mui/icons-material";
import { useConfig } from "@/hooks/useConfig";

const recommendedTimeServers = [
  "time.cloudflare.com",
  "time.google.com",
  "time.windows.com",
  "pool.ntp.org",
  "europe.pool.ntp.org",
  "ntp.time.nl",
  "time.apple.com",
  "time.nist.gov",
  "time.windows.com",
];

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
        secondary={
          <Stack direction="row" alignItems="center" mt={-1} spacing={0.5}>
            <Typography variant="body2">
              The server to use for time synchronization
            </Typography>
            <Tooltip
              arrow
              title={`Recommended time servers are: ${recommendedTimeServers.join(", ")}`}
            >
              <IconButton>
                <InfoRounded color="primary" />
              </IconButton>
            </Tooltip>
          </Stack>
        }
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
