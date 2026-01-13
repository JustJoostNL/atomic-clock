"use client";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
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

export const SettingsDialog: FC<IProps> = ({ open, onClose }) => {
  const { config, updateConfig } = useConfig();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [expanded, setExpanded] = useState<string | false>("general");

  const handleResetAll = useCallback(() => {
    if (confirm("Are you sure you want to reset all settings?")) {
      updateConfig(defaultConfig);
    }
  }, [updateConfig]);

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
      slotProps={{ paper: { sx: { maxHeight: isMobile ? "100%" : "90vh" } } }}
    >
      <DialogTitle>
        <Typography variant="h5" component="div">
          Settings
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Customize your clock experience
        </Typography>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ p: 0 }}>
        <Accordion
          expanded={expanded === "general"}
          onChange={handleChange("general")}
          disableGutters
          elevation={0}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">General</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 3, pb: 3 }}>
            <GeneralSettings />
          </AccordionDetails>
        </Accordion>

        <Divider />

        <Accordion
          expanded={expanded === "digital"}
          onChange={handleChange("digital")}
          disableGutters
          elevation={0}
          disabled={config.useAnalogClock}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Digital Clock</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 3, pb: 3 }}>
            <DigitalClockSettings />
          </AccordionDetails>
        </Accordion>

        <Divider />

        <Accordion
          expanded={expanded === "analog"}
          onChange={handleChange("analog")}
          disableGutters
          elevation={0}
          disabled={!config.useAnalogClock}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Analog Clock</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 3, pb: 3 }}>
            <AnalogClockSettings />
          </AccordionDetails>
        </Accordion>
      </DialogContent>

      <Divider />

      <DialogActions
        sx={{
          flexDirection: isMobile ? "column" : "row",
          gap: 1,
          px: 3,
          py: 2,
        }}
      >
        <Button
          color="error"
          onClick={handleResetAll}
          variant="outlined"
          fullWidth={isMobile}
        >
          Reset All Settings
        </Button>
        <Box sx={{ flex: 1 }} />
        <Button onClick={onClose} variant="contained" fullWidth={isMobile}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
