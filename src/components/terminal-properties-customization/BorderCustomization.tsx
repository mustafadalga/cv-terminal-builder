import {
  TextField,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useState } from "react";
import { useStore } from "@/store";
import type { Border } from "@/types";

const borderStyles: string[] = [
  "none",
  "hidden",
  "dotted",
  "dashed",
  "solid",
  "double",
  "groove",
  "ridge",
  "inset",
  "outset",
];
const menuItemStyles = {
  fontSize: 13,
  "&.Mui-selected": {
    backgroundColor: "transparent",
  },
};

export default function BorderCustomization() {
  const defaultBorder = useStore<Border>((state) => state.terminal.border);
  const defaultBorderRadius = useStore<number>(
    (state) => state.terminal.borderRadius
  );
  const [border, setBorder] = useState<Border>(defaultBorder);
  const [borderRadius, setBorderRadius] = useState<number>(defaultBorderRadius);

  const handleBorderChange = (property: string, value: string | number) => {
    const updatedBorder = {
      ...border,
      [property]: value,
    };
    setBorder(updatedBorder);
    useStore.setState((state) => ({
      terminal: { ...state.terminal, border: updatedBorder },
    }));
  };

  const handleBorderRadiusChange = (value: string) => {
    const borderRadius = parseInt(value);
    setBorderRadius(borderRadius);
    useStore.setState((state) => ({
      terminal: { ...state.terminal, borderRadius },
    }));
  };

  return (
    <Box
      sx={{
        p: 2,
        display: "grid",
        gap: 2,
        borderRadius: "5px",
        backdropFilter: "blur(4px)",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        boxShadow: "0 4px 12px 0 rgba(31, 38, 135, 0.37)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
      }}
    >
      <Typography variant="h6" gutterBottom component="div">
        Border
      </Typography>
      <Box
        sx={{
          display: "grid",
          gap: "12px",
          "grid-template-columns": "repeat(2, minmax(0, 1fr))",
        }}
      >
        <TextField
          label="Border Width"
          type="number"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
          value={border.width}
          onChange={(e) =>
            handleBorderChange("width", parseInt(e.target.value))
          }
        />
        <TextField
          label="Border Color"
          type="color"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
          value={border.color}
          onChange={(e) => handleBorderChange("color", e.target.value)}
        />
      </Box>
      <FormControl variant="standard" size="small" fullWidth>
        <InputLabel
          id="demo-simple-select-standard-label"
          sx={{ fontSize: 13 }}
        >
          Border Style
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          label="Border Style"
          value={border.style}
          onChange={(e) => handleBorderChange("style", e.target.value)}
          id="demo-simple-select-standard"
          sx={menuItemStyles}
        >
          {borderStyles.map((borderStyle, index) => (
            <MenuItem key={index} value={borderStyle} sx={{ fontSize: 13 }}>
              {borderStyle}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Border Radius"
        type="number"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        variant="standard"
        value={borderRadius}
        onChange={(e) => handleBorderRadiusChange(e.target.value)}
      />
    </Box>
  );
}
