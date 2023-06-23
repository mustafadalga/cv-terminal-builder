import {
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Slider,
  SliderValueLabel,
} from "@mui/material";
import Box from "./Box";
import { useState } from "react";
import { useStore } from "@/store";
import type { Border } from "@/store";
import ColorPicker from "./ColorPicker";

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

const boxStyles = {
  display: "grid",
  gap: "12px",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
};
const formControlStyle={
  marginTop:"20px",
  marginBottom:"20px",
}

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
    useStore.getState().setTerminalBorder(updatedBorder);
  };

  const handleBorderRadiusChange = (value: number) => {
    setBorderRadius(value);
    useStore.getState().setTerminalBorderRadius(value);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom component="div">
        Border
      </Typography>
      <Box sx={boxStyles}>
        <Grid container>
        <Typography variant="body2">
            Width
          </Typography>
          <Slider
            value={border.width}
            valueLabelDisplay="auto"
            slots={{
              valueLabel: SliderValueLabel,
            }}
            onChange={(_, value) => handleBorderChange("width", Number(value))}
          />
        </Grid>
      <Grid container>
        <ColorPicker
                  initialColor={border.color}
                  label="Color"
                  onColorChange={(color: string) =>
                    handleBorderChange("color", color)
                  }
        />
      </Grid>
      </Box>
      <FormControl variant="standard" size="small" fullWidth sx={formControlStyle}>
        <InputLabel>
          Style
        </InputLabel>
        <Select
          label="Style"
          value={border.style}
          onChange={(e) => handleBorderChange("style", e.target.value)}>
          {borderStyles.map((borderStyle) => (
            <MenuItem key={borderStyle} value={borderStyle}>
              {borderStyle}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Grid container>
      <Typography variant="body2">
          Radius
        </Typography>
        <Slider
          value={borderRadius}
          valueLabelDisplay="auto"
          slots={{
            valueLabel: SliderValueLabel,
          }}
          onChange={(_, value) => handleBorderRadiusChange(Number(value))}
        />
      </Grid>
    </Box>
  );
}
