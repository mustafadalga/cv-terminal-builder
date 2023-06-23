import { Typography } from "@mui/material";
import { useStore } from "@/store";
import ColorPicker from "./ColorPicker";
import Box from "./Box";

const style = {
  box: {
    display: "grid",
    gap: "12px",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  },
};

export default function ColorCustomization() {
  const {
    setPageColor,
    setTerminalBackground,
    setTerminalTextColor,
    setTerminalCursorColor,
    terminal,
  } = useStore((state) => state);

  const colorPickers = [
    {
      initialColor: terminal.pageColor,
      label: "Page",
      onColorChange: setPageColor,
    },
    {
      initialColor: terminal.terminalColor,
      label: "Terminal",
      onColorChange: setTerminalBackground,
    },
    {
      initialColor: terminal.textColor,
      label: "Text",
      onColorChange: setTerminalTextColor,
    },
    {
      initialColor: terminal.cursorColor,
      label: "Cursor",
      onColorChange: setTerminalCursorColor,
    },
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom component="div">
        Color
      </Typography>

      <Box sx={style.box}>
        {colorPickers.map(({ initialColor, label, onColorChange }, index) => (
          <ColorPicker
            key={index}
            initialColor={initialColor}
            label={label}
            onColorChange={onColorChange}
          />
        ))}
      </Box>
    </Box>
  );
}
