import { useState } from "react";
import { useStore } from "@/store";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  type SelectChangeEvent,
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
const menuItemStyles = {
  fontFamily: 13,
  "&.Mui-selected": {
    backgroundColor: "transparent",
  },
};

export default function () {
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
      <InputLabel
        id="demo-simple-select-standard-label"
        sx={{ fontFamily: 13 }}
      >
        Font Family
      </InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        label="Font Family"
        value={fontFamily}
        onChange={(e) => handleInput(e.target.value)}
        id="demo-simple-select-standard"
        sx={menuItemStyles}
      >
        {fontFamilies.map((fontFamily, index) => {
          const fontFamilyName = fontFamily.match(/'([^']+)'/)?.[1];

          return (
            <MenuItem key={index} value={fontFamily} sx={{ fontFamily: 13 }}>
              {fontFamilyName}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
