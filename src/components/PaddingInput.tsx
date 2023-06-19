import {  Typography, Grid, Slider, SliderValueLabel } from '@mui/material';
import { useState } from "react";
import { useStore } from "@/store";
import type { MarginPadding } from "@/types";
import Box from "./Box";

export default function () {
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
        useStore.setState((state) => ({
          terminal: { ...state.terminal, padding: updatedPadding },
        }));
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
                onChange={(e, value) => handlePaddingChange("top", Number(value))}
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
                onChange={(e, value) => handlePaddingChange("bottom", Number(value))}
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
                onChange={(e, value) => handlePaddingChange("left", Number(value))}
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
                onChange={(e, value) => handlePaddingChange("right", Number(value))}
              />
            </Grid>
          </Grid>
        </Box>
      );
};

