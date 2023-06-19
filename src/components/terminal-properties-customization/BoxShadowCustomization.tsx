import { TextField, Box, Typography } from '@mui/material';
import { useState } from "react";
import { useStore } from "@/store";
import type { Shadow } from '@/types';

export default function BoxShadowCustomization() {
    const defaultBoxShadow = useStore<Shadow>((state) => state.terminal.boxShadow);
    const [boxShadow, setBoxShadow] = useState<Shadow>(defaultBoxShadow);

    const handleBoxShadowChange = (property: string, value: string | number) => {
        const updatedBoxShadow = {
             ...boxShadow, 
             [property]: value 
            };
        setBoxShadow(updatedBoxShadow);
        useStore.setState((state) => ({ terminal: { ...state.terminal, boxShadow: updatedBoxShadow } }));
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
                Box Shadow
            </Typography>
            <Box sx={{
                display: "grid",
                gap: "12px",
                "grid-template-columns": "repeat(2, minmax(0, 1fr))"
            }}>
                <TextField
                    label="Horizontal Length"
                    type="number"
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="standard"
                    value={boxShadow.xOffset}
                    onChange={(e) => handleBoxShadowChange('xOffset', parseInt(e.target.value))}
                />
                <TextField
                    label="Vertical Length"
                    type="number"
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="standard"
                    value={boxShadow.yOffset}
                    onChange={(e) => handleBoxShadowChange('yOffset', parseInt(e.target.value))}
                />
                <TextField
                    label="Blur Radius"
                    type="number"
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="standard"
                    value={boxShadow.blurRadius}
                    onChange={(e) => handleBoxShadowChange('blurRadius', parseInt(e.target.value))}
                />
                <TextField
                    label="Color"
                    type="color"
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="standard"
                    value={boxShadow.color}
                    onChange={(e) => handleBoxShadowChange('color', e.target.value)}
                />
            </Box>
        </Box>
    );
};
