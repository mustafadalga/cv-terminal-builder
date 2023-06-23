import { Typography, SliderValueLabel, Slider, Grid } from "@mui/material";
import { useState } from "react";
import { useStore } from "@/store";
import type { Shadow } from "@/store";
import ColorPicker from "./ColorPicker";
import Box from "./Box";

const styles = {
  gridStyles: {
    display: "grid",
    gap: "12px",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  },
};

export default function BoxShadowCustomization() {
  const defaultBoxShadow = useStore<Shadow>(
    (state) => state.terminal.boxShadow
  );
  const [boxShadow, setBoxShadow] = useState<Shadow>(defaultBoxShadow);

  const updateBoxShadowProperty = (property: string, value: string | number) => {
    const updatedBoxShadow = {
      ...boxShadow,
      [property]: value,
    };
    setBoxShadow(updatedBoxShadow);
    useStore.getState().setBoxShadow(updatedBoxShadow);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom component="div">
        Box Shadow
      </Typography>
      <Box
        sx={styles.gridStyles}
      >
        <Grid container>
        <Typography variant="body2">
            Horizontal Length
          </Typography>
          <Slider
            value={boxShadow.xOffset}
            valueLabelDisplay="auto"
            slots={{
              valueLabel: SliderValueLabel,
            }}
            onChange={(_, value) =>
              updateBoxShadowProperty("xOffset", Number(value))
            }
          />
        </Grid>
        <Grid container>
        <Typography variant="body2">
            Vertical Length
          </Typography>
          <Slider
            value={boxShadow.yOffset}
            valueLabelDisplay="auto"
            slots={{
              valueLabel: SliderValueLabel,
            }}
            onChange={(_, value) =>
              updateBoxShadowProperty("yOffset", Number(value))
            }
          />
        </Grid>
        <Grid container>
        <Typography variant="body2">
            Blur Radius
          </Typography>
          <Slider
            value={boxShadow.blurRadius}
            valueLabelDisplay="auto"
            slots={{
              valueLabel: SliderValueLabel,
            }}
            onChange={(_, value) =>
              updateBoxShadowProperty("blurRadius", Number(value))
            }
          />
        </Grid>

        <ColorPicker
          initialColor={boxShadow.color}
          label="Color"
          onColorChange={(color: string) =>
            updateBoxShadowProperty("color", color)
          }
        />
      </Box>
    </Box>
  );
}
