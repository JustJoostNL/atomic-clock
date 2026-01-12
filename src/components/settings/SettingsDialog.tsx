"use client";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Tab,
  Tabs,
} from "@mui/material";
import { type FC, useCallback, useState } from "react";
import { useConfig } from "@/hooks/useConfig";
import { defaultConfig } from "@/lib/config/defaultConfig";
import { AnalogClockSettings } from "./sections/AnalogClockSettings";
import { DigitalClockSettings } from "./sections/DigitalClockSettings";
import { GeneralSettings } from "./sections/GeneralSettings";

interface IProps {
  open: boolean;
  onClose: () => void;
}

const TabPanel: FC<{
  children?: React.ReactNode;
  index: number;
  value: number;
}> = ({ children, value, index }) => {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ py: 2 }}>{children}</Box>}
    </div>
  );
};

export const SettingsDialog: FC<IProps> = ({ open, onClose }) => {
  const { updateConfig } = useConfig();
  const [tabValue, setTabValue] = useState(0);

  const handleResetAll = useCallback(() => {
    if (confirm("Are you sure you want to reset all settings?")) {
      updateConfig(defaultConfig);
    }
  }, [updateConfig]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Settings</DialogTitle>

      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        aria-label="settings tabs"
        sx={{ px: 3, borderBottom: 1, borderColor: "divider" }}
      >
        <Tab label="General" />
        <Tab label="Digital Clock" />
        <Tab label="Analog Clock" />
      </Tabs>

      <DialogContent sx={{ maxHeight: "calc(100vh - 300px)", px: 3 }}>
        <TabPanel value={tabValue} index={0}>
          <GeneralSettings />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <DigitalClockSettings />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <AnalogClockSettings />
        </TabPanel>
      </DialogContent>

      <Divider />

      <DialogActions sx={{ justifyContent: "space-between", px: 3, py: 2 }}>
        <Button color="error" onClick={handleResetAll} variant="outlined">
          Reset all settings
        </Button>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
