import {
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Slider,
  SliderValueLabel,
} from "@mui/material";
import Box from "./Box"
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

  const handleBorderRadiusChange = (value: number) => {
    const borderRadius = parseInt(value);
    setBorderRadius(borderRadius);
    useStore.setState((state) => ({
      terminal: { ...state.terminal, borderRadius },
    }));
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom component="div">
        Border
      </Typography>
      <Box
        sx={{
          display: "grid",
          gap: "12px",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        }}
      >
        <Grid container>
          <Typography
            sx={{
              fontSize: 13,
            }}
          >
            Border Width
          </Typography>
          <Slider
            value={border.width}
            valueLabelDisplay="auto"
            slots={{
              valueLabel: SliderValueLabel,
            }}
            onChange={(e, value) => handleBorderChange("width", Number(value))}
          />
        </Grid>
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
      <Grid container>
        <Typography
          sx={{
            fontSize: 13,
          }}
        >
          Border Radius
        </Typography>
        <Slider
          value={borderRadius}
          valueLabelDisplay="auto"
          slots={{
            valueLabel: SliderValueLabel,
          }}
          onChange={(e, value) => handleBorderRadiusChange(Number(value))}
        />
      </Grid>
    </Box>
  );
}
