import { TextField, Box, Typography } from "@mui/material";
import { useState } from "react";
import { useStore } from "@/store";
import type { MarginPadding } from "@/types";

export default function () {
  const defaultMargin = useStore<MarginPadding>(
    (state) => state.terminal.margin
  );
  const [margin, setMargin] = useState<MarginPadding>(defaultMargin);

  const handleMarginChange = (property: string, value: string | number) => {
    const updatedMargin = {
      ...margin,
      [property]: value,
    };
    setMargin(updatedMargin);
    useStore.setState((state) => ({
      terminal: { ...state.terminal, margin: updatedMargin },
    }));
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
        Margin
      </Typography>
      <Box
        sx={{
          display: "grid",
          gap: "12px",
          "grid-template-columns": "repeat(2, minmax(0, 1fr))",
        }}
      >
        <TextField
          label="Padding Top"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
          value={margin.top}
          onChange={(e) => handleMarginChange("top", parseInt(e.target.value))}
        />
        <TextField
          label="Padding Bottom"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
          value={margin.bottom}
          onChange={(e) =>
            handleMarginChange("bottom", parseInt(e.target.value))
          }
        />
        <TextField
          label="Padding Left"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
          value={margin.left}
          onChange={(e) => handleMarginChange("left", parseInt(e.target.value))}
        />
        <TextField
          label="Padding Right"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
          value={margin.right}
          onChange={(e) =>
            handleMarginChange("right", parseInt(e.target.value))
          }
        />
      </Box>
    </Box>
  );
}
