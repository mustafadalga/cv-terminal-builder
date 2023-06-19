import { useEffect, useState } from "react";
import { Typography, Grid } from "@mui/material";
import InputColor, { Color } from "react-input-color";
interface Props {
  initialColor: string;
  label: string;
  onColorChange: (hexColor: string) => void;
}

export default function ColorPicker({
  initialColor,
  label,
  onColorChange,
}: Props) {
  const [color, setColor] = useState<string>(initialColor);
  const changeColor = (color: Color) => {
    setColor(color.hex);
    onColorChange(color.hex);
  };

  useEffect(() => {
    if (initialColor !== color) {
      setColor(initialColor);
    }
  }, [initialColor]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <InputColor
          initialValue={color || ""}
          onChange={changeColor}
          placement="center"
          style={{ width: "100%" }}
        />
      </Grid>
    </Grid>
  );
}
