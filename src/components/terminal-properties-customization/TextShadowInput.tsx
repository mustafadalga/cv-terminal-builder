import { TextField, Box, Typography } from '@mui/material';
import { useState } from "react";
import { useStore } from "@/store";
import type { Shadow } from '@/types';

export default function () {
    const defaultTextShadow = useStore<Shadow>((state) => state.terminal.textShadow);
    const [textShadow, setTextShadow] = useState<Shadow>(defaultTextShadow);

    const handleTextShadowChange = (property: string, value: string | number) => {
        const updatedTextShadow = {
             ...textShadow, 
             [property]: value 
            };
        setTextShadow(updatedTextShadow);
        useStore.setState((state) => ({ terminal: { ...state.terminal, textShadow: updatedTextShadow } }));
      };
  
    return (
        <Box
            sx={{
                p: 2,
                borderRadius: '5px',
                backdropFilter: 'blur(4px)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                boxShadow: '0 4px 12px 0 rgba(31, 38, 135, 0.37)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
            }}
        >
            <Typography variant="h6" gutterBottom component="div">
                Text Shadow
            </Typography>
            <Box sx={{
                display: "grid",
                gap: "12px",
                "grid-template-columns": "repeat(2, minmax(0, 1fr))"
            }}>
                            <TextField
                label="Text Shadow X-Offset"
                type="number"
                fullWidth
                InputLabelProps={{
                    shrink: true,
                }}
                variant="standard"
                value={textShadow.xOffset}
                onChange={(e) => handleTextShadowChange('xOffset', parseInt(e.target.value))}
            />
            <TextField
                label="Text Shadow Y-Offset"
                type="number"
                fullWidth
                InputLabelProps={{
                    shrink: true,
                }}
                variant="standard"
                value={textShadow.yOffset}
                onChange={(e) => handleTextShadowChange('yOffset', parseInt(e.target.value))}
            />
            <TextField
                label="Text Shadow Blur Radius"
                type="number"
                fullWidth
                InputLabelProps={{
                    shrink: true,
                }}
                variant="standard"
                value={textShadow.blurRadius}
                onChange={(e) => handleTextShadowChange('blurRadius', parseInt(e.target.value))}
            />
            <TextField
                label="Text Shadow Color"
                type="color"
                fullWidth
                InputLabelProps={{
                    shrink: true,
                }}
                variant="standard"
                value={textShadow.color}
                onChange={(e) => handleTextShadowChange('color', e.target.value)}
            />
            </Box>
        </Box>

    );
};

