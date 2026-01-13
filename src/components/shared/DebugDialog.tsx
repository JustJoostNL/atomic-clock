"use client";
import {
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
import type { FC } from "react";
import { JSONTree } from "react-json-tree";

interface IProps {
  open: boolean;
  onClose: () => void;
  data: Record<string, unknown>;
}

export const DebugDialog: FC<IProps> = ({ open, onClose, data }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
          Debug Information
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Application state and configuration
        </Typography>
      </DialogTitle>

      <Divider />

      <DialogContent
        sx={{
          p: 2,
          overflowY: "auto",
          "& ul": { bgcolor: "background.default", p: 1, borderRadius: 1 },
        }}
      >
        <JSONTree
          data={data}
          theme="monokai"
          invertTheme={theme.palette.mode === "light"}
        />
      </DialogContent>

      <Divider />

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} variant="contained" fullWidth={isMobile}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
