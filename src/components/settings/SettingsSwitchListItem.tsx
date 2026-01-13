import { ListItem, ListItemText, Switch } from "@mui/material";
import { type FC, useCallback } from "react";
import { useConfig } from "@/hooks/useConfig";
import type { IConfig } from "@/lib/config/config_types";

interface IProps {
  primary: string;
  secondary: string;
  configItem: keyof IConfig;
  inverted?: boolean;
}

export const SettingsSwitchListItem: FC<IProps> = ({
  primary,
  secondary,
  configItem,
  inverted = false,
}) => {
  const { config, updateConfig } = useConfig();

  const handleChange = useCallback(() => {
    updateConfig({ [configItem]: !config[configItem] });
  }, [config, configItem, updateConfig]);

  const checked = inverted ? !config[configItem] : !!config[configItem];

  return (
    <ListItem>
      <ListItemText primary={primary} secondary={secondary} />
      <Switch checked={checked} onChange={handleChange} />
    </ListItem>
  );
};
