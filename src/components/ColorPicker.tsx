import { useEffect, useState, useCallback } from "react";
import { Typography, Grid } from "@mui/material";
import InputColor, { Color } from "react-input-color";

interface ColorPickerProps {
  initialColor: string;
  label: string;
  onColorChange: (hexColor: string) => void;
}

export default function ColorPicker({
  initialColor,
  label,
  onColorChange,
}: ColorPickerProps) {
  const [color, setColor] = useState<string>(initialColor);

  const changeColor = useCallback((color: Color) => {
    setColor(color.hex);
    onColorChange(color.hex);
  }, [onColorChange]);

  useEffect(() => {
    if (initialColor !== color) {
      setColor(initialColor);
    }
  }, [initialColor, color]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <div style={{ width: "100%" }}>
          <InputColor
            initialValue={color || ""}
            onChange={changeColor}
            placement="center"
          />
        </div>
      </Grid>
    </Grid>
  );
}
