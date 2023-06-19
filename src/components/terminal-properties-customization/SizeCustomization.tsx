import { Size } from "@/types";
import { TextField,Box,Typography } from "@mui/material";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { useStore } from "@/store";

export default function () {
  const size = useStore<Size>((state) => state.terminal.size);
  const [cols, setCols] = useState<number>(size.cols);
  const [rows, setRows] = useState<number>(size.rows);
  const setTerminalSize=useStore((state) => state.setTerminalSize)

  const handleSizeChange = (
    property: string,
    value: string,
    setState: Dispatch<SetStateAction<number>>,
  ) => {
    const updatedSize = {
      ...size,
      [property]: value,
    };
    setState(value);
    setTerminalSize(updatedSize);
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
        Size
      </Typography>
      <Box
        sx={{
          display: "grid",
          gap: "12px",
          "grid-template-columns": "repeat(2, minmax(0, 1fr))",
        }}
      >
     <TextField
        label="Cols"
        type="number"
        InputLabelProps={{ shrink: true }}
        variant="standard"
        value={cols}
        onChange={(e) => {
          handleSizeChange("cols", e.target.value,setCols);
        }}
      />
      <TextField
        label="Rows"
        type="number"
        InputLabelProps={{ shrink: true }}
        variant="standard"
        value={rows}
        onChange={(e) => {
          handleSizeChange("rows", e.target.value,setRows);
        }}
      />
        </Box>
    </Box>
  );
}
