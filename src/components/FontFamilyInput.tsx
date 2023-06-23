import { useState } from "react";
import { useStore } from "@/store";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const fontFamilies: string[] = [
  "'Courier Prime', monospace",
  "'Cutive Mono', monospace",
  "'Fira Code', monospace",
  "'JetBrains Mono', monospace",
  "'Major Mono Display', monospace",
  "'Recursive', sans-serif",
  "'Roboto Mono', monospace",
  "'Source Code Pro', monospace",
  "'Space Mono', monospace",
  "'Ubuntu Mono', monospace",
];

export default function FontFamilyInput() {
  const defaultFontFamily: string = useStore(
    (state) => state.terminal.fontFamily
  );
  const [fontFamily, setFontFamily] = useState<string>(defaultFontFamily);

  const handleInput = (family: string) => {
    setFontFamily(family);
    useStore.getState().setFontFamily(family);
  };

  return (
    <FormControl variant="standard" size="small" fullWidth>
      <InputLabel>
        Font Family
      </InputLabel>
      <Select
        label="Font Family"
        value={fontFamily}
        onChange={(e) => handleInput(e.target.value)}
      >
        {fontFamilies.map((fontFamily, index) => {
          const fontFamilyName = fontFamily.match(/'([^']+)'/)?.[1];

          return (
            <MenuItem key={index} value={fontFamily}>
              {fontFamilyName}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
