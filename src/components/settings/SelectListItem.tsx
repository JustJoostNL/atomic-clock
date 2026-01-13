import {
  FormControl,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import type { FC } from "react";
import { useConfig } from "@/hooks/useConfig";
import type { IConfig } from "@/lib/config/config_types";
import { SettingResetButton } from "./SettingResetButton";

interface IProps {
  primary: string;
  secondary: string;
  configItem: keyof IConfig;
  options: Array<{ value: string | number; label: string }>;
}

export const SelectListItem: FC<IProps> = ({
  primary,
  secondary,
  configItem,
  options,
}) => {
  const { config, updateConfig } = useConfig();

  return (
    <ListItem
      sx={{
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "flex-start", sm: "center" },
        gap: { xs: 1, sm: 0 },
        py: 1.5,
      }}
    >
      <ListItemText
        primary={primary}
        secondary={secondary}
        sx={{ flex: 1, minWidth: { xs: "100%", sm: "auto" } }}
      />
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <SettingResetButton configItem={configItem} />
        <FormControl size="small">
          <Select
            value={config[configItem]}
            onChange={(e) => updateConfig({ [configItem]: e.target.value })}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </ListItem>
  );
};
