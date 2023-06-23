import { Grid, Slider, SliderValueLabel, Typography } from "@mui/material";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { useStore, Size } from "@/store";
import Box from "./Box";
export default function SizeCustomization() {
  const size = useStore<Size>((state) => state.terminal.size);
  const [cols, setCols] = useState<number>(size.cols);
  const [rows, setRows] = useState<number>(size.rows);
  const setTerminalSize = useStore((state) => state.setTerminalSize);

  const handleSizeChange = (
    property: string,
    value: number,
    setState: Dispatch<SetStateAction<number>>
  ) => {
    const updatedSize = {
      ...size,
      [property]: value,
    };
    setState(value);
    setTerminalSize(updatedSize);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom component="div">
        Size
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="body2" >
            Terminal Width (Cols)
          </Typography>
          <Slider
            value={cols}
            valueLabelDisplay="auto"
            slots={{
              valueLabel: SliderValueLabel,
            }}
            min={20}
            max={200}
            onChange={(_, value) =>
              handleSizeChange("cols", Number(value), setCols)
            }
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body2" >
            Terminal Height (Rows)
          </Typography>
          <Slider
            value={rows}
            valueLabelDisplay="auto"
            slots={{
              valueLabel: SliderValueLabel,
            }}
            min={20}
            max={200}
            onChange={(_, value) =>
              handleSizeChange("rows", Number(value), setRows)
            }
          />
        </Grid>
      </Grid>
    </Box>
  );
}
