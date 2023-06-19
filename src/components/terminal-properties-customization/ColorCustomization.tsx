import { TextField, Box, Typography } from "@mui/material";
import { useState } from "react";
import { useStore } from "@/store";
import type { Dispatch, SetStateAction } from "react";

export default function () {
  const defaultColors = useStore((state) => state.terminal);
  const [pageColor, setPageColor] = useState<string>(
    defaultColors.bodyBackground
  );
  const [terminalColor, setTerminalColor] = useState<string>(
    defaultColors.background
  );
  const [textColor, setTextColor] = useState<string>(defaultColors.textColor);
  const [cursorColor, setCursorColor] = useState<string>(
    defaultColors.cursorColor
  );

  const setBodyBackground = useStore((state) => state.setBodyBackground);
  const setTerminalBackground = useStore(
    (state) => state.setTerminalBackground
  );
  const setTerminalTextColor = useStore((state) => state.setTerminalTextColor);
  const setTerminalCursorColor = useStore(
    (state) => state.setTerminalCursorColor
  );

  const handleColorChange = (
    color: string,
    setState: Dispatch<SetStateAction<string>>,
    storeSetter: (color: string) => void
  ) => {
    setState(color);
    storeSetter(color);
  };

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: "5px",
        backdropFilter: "blur(4px)",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        boxShadow: "0 4px 12px 0 rgba(31, 38, 135, 0.37)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
      }}
    >
      <Typography variant="h6" gutterBottom component="div">
        Color
      </Typography>

      <Box
        sx={{
          display: "grid",
          gap: "12px",
          "grid-template-columns": "repeat(2, minmax(0, 1fr))",
        }}
      >
        <TextField
          label="Page Color"
          type="color"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
          value={pageColor}
          onChange={(e) =>
            handleColorChange(e.target.value, setPageColor, setBodyBackground)
          }
        />
        <TextField
          label="Terminal Color"
          type="color"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
          value={terminalColor}
          onChange={(e) =>
            handleColorChange(
              e.target.value,
              setTerminalColor,
              setTerminalBackground
            )
          }
        />
        <TextField
          label="Text Color"
          type="color"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
          value={textColor}
          onChange={(e) =>
            handleColorChange(
              e.target.value,
              setTextColor,
              setTerminalTextColor
            )
          }
        />
        <TextField
          label="Cursor Color"
          type="color"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
          value={cursorColor}
          onChange={(e) =>
            handleColorChange(
              e.target.value,
              setCursorColor,
              setTerminalCursorColor
            )
          }
        />
      </Box>
    </Box>
  );
}
