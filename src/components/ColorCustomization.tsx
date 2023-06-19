import { Typography } from "@mui/material";
import { useStore } from "@/store";
import ColorPicker from "./ColorPicker";
import Box from "./Box";

export default function () {
  const store = useStore((state) => state);
  const terminal = store.terminal;

  return (
    <Box>
      <Typography variant="h6" gutterBottom component="div">
        Color
      </Typography>

      <Box
        sx={{
          display: "grid",
          gap: "12px",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        }}
      >
        <ColorPicker
          initialColor={terminal.pageColor}
          label="Page"
          onColorChange={store.setPageColor}
        />

        <ColorPicker
          initialColor={terminal.terminalColor}
          label="Terminal"
          onColorChange={store.setTerminalBackground}
        />

        <ColorPicker
          initialColor={terminal.textColor}
          label="Text"
          onColorChange={store.setTerminalTextColor}
        />

        <ColorPicker
          initialColor={terminal.cursorColor}
          label="Cursor"
          onColorChange={store.setTerminalCursorColor}
        />
      </Box>
    </Box>
  );
}
