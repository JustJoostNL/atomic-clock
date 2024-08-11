import { Button } from "@mui/material";
import { FC, useCallback } from "react";
import { useConfig } from "@/hooks/useConfig";
import { defaultConfig } from "@/lib/config/defaultConfig";

interface IProps {
  configItem: keyof typeof defaultConfig;
}

export const SettingResetButton: FC<IProps> = ({ configItem }) => {
  const { updateConfig } = useConfig();

  const handleReset = useCallback(() => {
    updateConfig({ [configItem]: defaultConfig[configItem] });
  }, [configItem, updateConfig]);

  return (
    <Button variant="outlined" sx={{ mr: 3 }} onClick={handleReset}>
      Reset
    </Button>
  );
};
