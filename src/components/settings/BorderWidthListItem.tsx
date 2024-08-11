import { ListItem, ListItemText, Slider } from "@mui/material";
import { FC } from "react";
import { useConfig } from "@/hooks/useConfig";

export const BorderWidthListItem: FC = () => {
  const { config, updateConfig } = useConfig();

  return (
    <ListItem>
      <ListItemText
        primary="Clock border width"
        secondary="The width of the border around the clock"
      />
      <div style={{ width: 200 }}>
        <Slider
          value={config.clockBorderWidth}
          min={1}
          max={10}
          step={1}
          valueLabelDisplay="auto"
          onChange={(_, value) =>
            updateConfig({
              clockBorderWidth: value as number,
            })
          }
        />
      </div>
    </ListItem>
  );
};
