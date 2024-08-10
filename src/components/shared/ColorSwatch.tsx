import { Box, TextField } from "@mui/material";
import { RgbColor, RgbColorPicker } from "react-colorful";
import React, { ChangeEvent, useCallback } from "react";

interface IProps {
  color: {
    r: number;
    g: number;
    b: number;
  };
  onChange?: (rgbColor: { r: number; g: number; b: number }) => void;
}

export const ColorSwatch: React.FC<IProps> = ({ color, onChange }) => {
  const handlePickerChange = useCallback(
    (newColor: RgbColor) => {
      onChange?.(newColor);
    },
    [onChange],
  );

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      onChange?.({ ...color, [name]: Number(value) });
    },
    [color, onChange],
  );

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
        }}
      >
        <RgbColorPicker
          draggable
          style={{ width: 260, height: 150, marginRight: 5 }}
          color={color}
          onChange={handlePickerChange}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            mt: 3,
          }}
        >
          <TextField
            label="Red"
            value={color.r}
            onChange={handleInputChange}
            inputProps={{
              min: 0,
              max: 100,
              step: 1,
              type: "number",
            }}
            sx={{ width: 80, mr: 1 }}
          />

          <TextField
            label="Green"
            value={color.g}
            onChange={handleInputChange}
            inputProps={{
              min: 0,
              max: 100,
              step: 1,
              type: "number",
            }}
            sx={{ width: 80 }}
          />

          <TextField
            label="Blue"
            value={color.b}
            onChange={handleInputChange}
            inputProps={{
              min: 0,
              max: 100,
              step: 1,
              type: "number",
            }}
            sx={{ width: 80, ml: 1 }}
          />
        </Box>
      </Box>
    </>
  );
};
