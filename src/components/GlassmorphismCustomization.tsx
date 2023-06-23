import { Grid, Slider, SliderValueLabel, Typography } from "@mui/material";
import { useState } from "react";
import { useStore } from "@/store";
import Box from "./Box";
export default function GlassmorphismCustomization() {
  const terminalBlur = useStore<number>((state) => state.terminal.blur);
  const terminalOpacity = useStore<number>((state) => state.terminal.opacity);
  const [opacity, setOpacity] = useState<number>(terminalOpacity);
  const [blur, setBlur] = useState<number>(terminalBlur);
  const setTerminalOpacity = useStore((state) => state.setOpacity);
  const setTerminalBlur = useStore((state) => state.setBlur);

  const handleOpacity = (opacity: number) => {
    setOpacity(opacity);
    setTerminalOpacity(opacity);
  };

  const handleBlur = (blur: number) => {
    setBlur(blur);
    setTerminalBlur(blur);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom component="div">
        Glassmorphism Customization
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            sx={{
              fontSize: 13,
            }}
          >
            Blur
          </Typography>
          <Slider
            value={blur}
            valueLabelDisplay="auto"
            slots={{
              valueLabel: SliderValueLabel,
            }}
            min={0}
            max={20}
            onChange={(_, value) => handleBlur(Number(value))}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography
            sx={{
              fontSize: 13,
            }}
          >
            Opacity
          </Typography>
          <Slider
            value={opacity}
            valueLabelDisplay="auto"
            slots={{
              valueLabel: SliderValueLabel,
            }}
            min={0}
            max={1}
            step={0.1}
            onChange={(_, value) => handleOpacity(Number(value))}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
