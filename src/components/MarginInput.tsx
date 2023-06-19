import {
  Slider,
  Grid,
  Typography,
  SliderValueLabel,
} from "@mui/material";
import { useState } from "react";
import { useStore } from "@/store";
import type { MarginPadding } from "@/types";
import Box from "./Box";
export default function () {
  const defaultMargin = useStore<MarginPadding>(
    (state) => state.terminal.margin
  );
  const [margin, setMargin] = useState<MarginPadding>(defaultMargin);

  const handleMarginChange = (property: string, value: number) => {
    const updatedMargin = {
      ...margin,
      [property]: Number(value),
    };
    setMargin(updatedMargin);
    useStore.setState((state) => ({
      terminal: { ...state.terminal, margin: updatedMargin },
    }));
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom component="div">
        Margin
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography sx={{
            fontSize: 13,
          }}>
            Margin Top
          </Typography>
          <Slider
            value={margin.top}
            valueLabelDisplay="auto"
            slots={{
              valueLabel: SliderValueLabel,
            }}
            onChange={(e, value) => handleMarginChange("top", Number(value))}
          />
        </Grid>
        <Grid item xs={6}>
        <Typography sx={{
            fontSize: 13,
          }}>
            Margin Bottom
          </Typography>
          <Slider
            value={margin.bottom}
            valueLabelDisplay="auto"
            slots={{
              valueLabel: SliderValueLabel,
            }}
            onChange={(e, value) => handleMarginChange("bottom", Number(value))}
          />
        </Grid>
        <Grid item xs={6}>
        <Typography sx={{
            fontSize: 13,
          }}>
            Margin Left
          </Typography>
          <Slider
            value={margin.left}
            valueLabelDisplay="auto"
            slots={{
              valueLabel: SliderValueLabel,
            }}
            onChange={(e, value) => handleMarginChange("left", Number(value))}
          />
        </Grid>
        <Grid item xs={6}>
        <Typography sx={{
            fontSize: 13,
          }}>
            Margin Right
          </Typography>
          <Slider
            valueLabelDisplay="auto"
            slots={{
              valueLabel: SliderValueLabel,
            }}
            value={margin.right}
            onChange={(e, value) => handleMarginChange("right", Number(value))}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
