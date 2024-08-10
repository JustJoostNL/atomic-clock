import {
  ListItem,
  ListItemText,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { FC, useCallback } from "react";
import { useConfig } from "@/hooks/useConfig";
import { IConfig } from "@/lib/config/config_types";

export const FractionalSecondDigitsListItem: FC = () => {
  const { config, updateConfig } = useConfig();

  const handleChange = useCallback(
    (e: SelectChangeEvent) => {
      const isValid = ["1", "2", "3"].includes(e.target.value);
      if (!isValid) return;

      updateConfig({
        fractionalSecondDigits: parseInt(
          e.target.value,
        ) as IConfig["fractionalSecondDigits"],
      });
    },
    [updateConfig],
  );

  return (
    <ListItem>
      <ListItemText
        primary="Fractional second digits"
        secondary="Number of digits to display after the decimal point"
      />
      <Select
        value={config.fractionalSecondDigits.toString()}
        onChange={handleChange}
      >
        <MenuItem value="1">1</MenuItem>
        <MenuItem value="2">2</MenuItem>
        <MenuItem value="3">3</MenuItem>
      </Select>
    </ListItem>
  );
};
