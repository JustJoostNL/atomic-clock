import {
  Box,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import type { FC, ReactNode } from "react";

interface IProps {
  primary: string;
  secondary?: string;
  children: ReactNode;
}

export const SettingItem: FC<IProps> = ({ primary, secondary, children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ListItem
      sx={{
        flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "flex-start" : "center",
        gap: isMobile ? 1 : 0,
        py: 1.5,
      }}
    >
      <ListItemText
        primary={primary}
        secondary={secondary}
        sx={{ flex: 1, minWidth: isMobile ? "100%" : "auto" }}
        slotProps={{
          primary: { variant: "body1" },
          secondary: { variant: "body2" },
        }}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          width: isMobile ? "100%" : "auto",
          minWidth: isMobile ? "100%" : 300,
        }}
      >
        {children}
      </Box>
    </ListItem>
  );
};
