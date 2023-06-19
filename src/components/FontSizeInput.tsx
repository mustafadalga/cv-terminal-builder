import { TextField } from "@mui/material";
import { useState } from "react";
import { useStore } from "@/store";

export default function () {
  const defaultFontSize: number = useStore((state) => state.terminal.fontSize);
  const [fontSize, setFontSize] = useState<number>(defaultFontSize);

  const handleInput = (size: number) => {
    setFontSize(size);
    useStore.getState().setFontSize(size);
  };
  return (
    <TextField
      label="Font Size"
      type="number"
      fullWidth
      size="small"
      variant="standard"
      defaultValue={fontSize}
      InputLabelProps={{
        shrink: true,
        sx: { fontSize: 13 }, // Set label font size to 12
      }}
      inputProps={{
        min: 10,
        max: 24,
        style: { fontSize: 13 },
      }}
      onChange={(e) => handleInput(parseInt(e.target.value))}
    />
  );
}
