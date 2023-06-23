import { TextField } from "@mui/material";
import { useState } from "react";
import { useStore } from "@/store";

export default function FontSizeInput() {
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
      variant="standard"
      defaultValue={fontSize}
      inputProps={{
        min: 10,
        max: 24,
      }}
      onChange={(e) => handleInput(parseInt(e.target.value))}
    />
  );
}
