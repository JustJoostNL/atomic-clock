"use client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import type { FC, ReactNode } from "react";
import { ConfigProvider } from "@/hooks/useConfig";
import { theme } from "@/lib/theme/theme";

export const Providers: FC<Readonly<{ children: ReactNode }>> = ({
  children,
}) => {
  return (
    <ConfigProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ConfigProvider>
  );
};
