import { ListItem, ListItemText, Switch } from "@mui/material";
import { FC, useCallback } from "react";
import { useConfig } from "@/hooks/useConfig";
import { IConfig } from "@/lib/config/config_types";

interface IProps {
  primary: string;
  secondary: string;
  configItem: keyof IConfig;
}

export const SettingsSwitchListItem: FC<IProps> = ({
  primary,
  secondary,
  configItem,
}) => {
  const { config, updateConfig } = useConfig();

  const handleChange = useCallback(() => {
    updateConfig({ [configItem]: !config[configItem] });
  }, [config, configItem, updateConfig]);

  return (
    <ListItem>
      <ListItemText primary={primary} secondary={secondary} />
      <Switch checked={Boolean(config[configItem])} onChange={handleChange} />
    </ListItem>
  );
};
