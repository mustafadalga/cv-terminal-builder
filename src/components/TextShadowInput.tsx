import { Grid, Slider, SliderValueLabel, Typography } from "@mui/material";
import { useState } from "react";
import {
    useStore,
    type Shadow
} from "@/store";
import type {} from "@/types";
import Box from "./Box";
import ColorPicker from "./ColorPicker";

export default function TextShadow() {
    const defaultTextShadow = useStore<Shadow>(
        (state) => state.terminal.textShadow
    );
    const [ textShadow, setTextShadow ] = useState<Shadow>(defaultTextShadow);

    const handleTextShadowChange = (property: string, value: string | number) => {
        const updatedTextShadow = {
            ...textShadow,
            [property]: value,
        };
        setTextShadow(updatedTextShadow);
        useStore.getState().setTextShadow(updatedTextShadow)
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom component="div">
                Text Shadow
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
                        value={textShadow.xOffset}
                        valueLabelDisplay="auto"
                        slots={{
                            valueLabel: SliderValueLabel,
                        }}
                        onChange={(_, value) =>
                            handleTextShadowChange("xOffset", Number(value))
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
                        value={textShadow.yOffset}
                        valueLabelDisplay="auto"
                        slots={{
                            valueLabel: SliderValueLabel,
                        }}
                        onChange={(_, value) =>
                            handleTextShadowChange("yOffset", Number(value))
                        }
                    />
                </Grid>

                <Grid container>
                    <Typography
                        sx={{
                            fontSize: 13,
                        }}
                    >
                        Blur Radius {textShadow.color}
                    </Typography>
                    <Slider
                        value={textShadow.blurRadius}
                        valueLabelDisplay="auto"
                        slots={{
                            valueLabel: SliderValueLabel,
                        }}
                        onChange={(_, value) =>
                            handleTextShadowChange("blurRadius", Number(value))
                        }
                    />
                </Grid>

                <ColorPicker
                    initialColor={textShadow.color}
                    label="Color"
                    onColorChange={(color: string) =>
                        handleTextShadowChange("color", color)
                    }
                />
            </Box>
        </Box>
    );
}
