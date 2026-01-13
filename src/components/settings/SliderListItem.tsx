import { ListItem, ListItemText, Slider } from "@mui/material";
import type { FC } from "react";
import { useConfig } from "@/hooks/useConfig";
import type { IConfig } from "@/lib/config/config_types";
import { SettingResetButton } from "./SettingResetButton";

interface IProps {
  primary: string;
  secondary: string;
  configItem: keyof IConfig;
  min: number;
  max: number;
  step: number;
}

export const SliderListItem: FC<IProps> = ({
  primary,
  secondary,
  configItem,
  min,
  max,
  step,
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          width: "100%",
          maxWidth: 300,
        }}
      >
        <SettingResetButton configItem={configItem} />
        <Slider
          value={Number(config[configItem])}
          min={min}
          max={max}
          step={step}
          valueLabelDisplay="auto"
          onChange={(_, value) =>
            updateConfig({ [configItem]: value as number })
          }
          sx={{ flex: 1 }}
        />
      </div>
    </ListItem>
  );
};
