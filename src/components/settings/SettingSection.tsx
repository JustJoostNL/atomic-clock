import { Box, List, Typography } from "@mui/material";
import type { FC, ReactNode } from "react";

interface IProps {
  title?: string;
  children: ReactNode;
}

export const SettingSection: FC<IProps> = ({ title, children }) => {
  return (
    <Box sx={{ mb: title ? 3 : 0 }}>
      {title && (
        <Typography
          variant="subtitle1"
          fontWeight={600}
          color="text.secondary"
          sx={{ mb: 1, textTransform: "uppercase", fontSize: "0.875rem" }}
        >
          {title}
        </Typography>
      )}
      <List
        disablePadding
        sx={{
          "& > *:not(:last-child)": { borderBottom: 1, borderColor: "divider" },
        }}
      >
        {children}
      </List>
    </Box>
  );
};
