import { styled } from "@mui/material";
import React, { DetailedHTMLProps, FC, HTMLAttributes } from "react";

const StyledKeyboardHotkey = styled("kbd")(({ theme }) => ({
  fontFamily:
    "ui-monospace, Menlo, Monaco, 'Cascadia Mono', 'Segoe UI Mono', 'Roboto Mono', 'Oxygen Mono', 'Ubuntu Monospace', 'Source Code Pro', 'Fira Mono', 'Droid Sans Mono', 'Courier New', monospace",
  fontWeight: 900,
  display: "inline-block",
  padding: theme.spacing(0, 1),
  margin: theme.spacing(0.5, 0),
  background: theme.palette.action.hover,
  border: `2px solid ${theme.palette.divider}`,
  borderTopWidth: 1,
  borderBottomWidth: 4,
  borderRadius: theme.shape.borderRadius,
  backgroundShadow: theme.shadows[4],
}));

export const KeyboardHotkey: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
> = (props) => {
  return <StyledKeyboardHotkey {...props} />;
};
