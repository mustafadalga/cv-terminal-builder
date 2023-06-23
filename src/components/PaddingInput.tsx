import {  Typography, Grid, Slider, SliderValueLabel } from '@mui/material';
import { useState } from "react";
import { useStore } from "@/store";
import type { MarginPadding } from "@/store";
import Box from "./Box";

export default function PaddingInput() {
    const defaultPadding = useStore<MarginPadding>(
        (state) => state.terminal.padding
      );
      const [padding, setPadding] = useState<MarginPadding>(defaultPadding);
    
      const handlePaddingChange = (property: string, value: string | number) => {
        const updatedPadding = {
          ...padding,
          [property]: value,
        };
        setPadding(updatedPadding);
        useStore.getState().setTerminalPadding(updatedPadding);
      };
      return (
        <Box>
          <Typography variant="h6" gutterBottom component="div">
            Padding
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography sx={{
                fontSize: 13,
              }}>
                Padding Top
              </Typography>
              <Slider
                value={padding.top}
                valueLabelDisplay="auto"
                slots={{
                  valueLabel: SliderValueLabel,
                }}
                onChange={(_, value) => handlePaddingChange("top", Number(value))}
              />
            </Grid>
            <Grid item xs={6}>
            <Typography sx={{
                fontSize: 13,
              }}>
                Padding Bottom
              </Typography>
              <Slider
                value={padding.bottom}
                valueLabelDisplay="auto"
                slots={{
                  valueLabel: SliderValueLabel,
                }}
                onChange={(_, value) => handlePaddingChange("bottom", Number(value))}
              />
            </Grid>
            <Grid item xs={6}>
            <Typography sx={{
                fontSize: 13,
              }}>
                Padding Left
              </Typography>
              <Slider
                value={padding.left}
                valueLabelDisplay="auto"
                slots={{
                  valueLabel: SliderValueLabel,
                }}
                onChange={(_, value) => handlePaddingChange("left", Number(value))}
              />
            </Grid>
            <Grid item xs={6}>
            <Typography sx={{
                fontSize: 13,
              }}>
                Padding Right
              </Typography>
              <Slider
                valueLabelDisplay="auto"
                slots={{
                  valueLabel: SliderValueLabel,
                }}
                value={padding.right}
                onChange={(_, value) => handlePaddingChange("right", Number(value))}
              />
            </Grid>
          </Grid>
        </Box>
      );
};

