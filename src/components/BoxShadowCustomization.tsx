import {
  Typography,
  SliderValueLabel,
  Slider,
  Grid,
} from "@mui/material";
import { useState } from "react";
import { useStore } from "@/store";
import type { Shadow } from "@/types";
import ColorPicker from "./ColorPicker";
import Box from "./Box";
export default function BoxShadowCustomization() {
  const defaultBoxShadow = useStore<Shadow>(
    (state) => state.terminal.boxShadow
  );
  const [boxShadow, setBoxShadow] = useState<Shadow>(defaultBoxShadow);

  const handleBoxShadowChange = (property: string, value: string | number) => {
    const updatedBoxShadow = {
      ...boxShadow,
      [property]: value,
    };
    setBoxShadow(updatedBoxShadow);
    useStore.setState((state) => ({
      terminal: { ...state.terminal, boxShadow: updatedBoxShadow },
    }));
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom component="div">
        Box Shadow
      </Typography>
      <Box
        sx={{
          display: "grid",
          gap: "12px",
         gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        }}
      >
        <Grid container>
          <Typography
            sx={{
              fontSize: 13,
            }}
          >
            Horizontal Length
          </Typography>
          <Slider
            value={boxShadow.xOffset}
            valueLabelDisplay="auto"
            slots={{
              valueLabel: SliderValueLabel,
            }}
            onChange={(e, value) =>
              handleBoxShadowChange("xOffset", Number(value))
            }
          />
        </Grid>
        <Grid container>
          <Typography
            sx={{
              fontSize: 13,
            }}
          >
            Vertical Length
          </Typography>
          <Slider
            value={boxShadow.yOffset}
            valueLabelDisplay="auto"
            slots={{
              valueLabel: SliderValueLabel,
            }}
            onChange={(e, value) =>
              handleBoxShadowChange("yOffset", Number(value))
            }
          />
        </Grid>
        <Grid container>
          <Typography
            sx={{
              fontSize: 13,
            }}
          >
            Blur Radius
          </Typography>
          <Slider
            value={boxShadow.blurRadius}
            valueLabelDisplay="auto"
            slots={{
              valueLabel: SliderValueLabel,
            }}
            onChange={(e, value) =>
              handleBoxShadowChange("blurRadius", Number(value))
            }
          />
        </Grid>

        <ColorPicker
          initialColor={boxShadow.color}
          label="Color"
          onColorChange={(color: string) =>
            handleBoxShadowChange("color", color)
          }
        />
      </Box>
    </Box>
  );
}
