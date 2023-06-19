import { TextField, Box, Typography } from '@mui/material';
import { useState } from "react";
import { useStore } from "@/store";
import type { MarginPadding } from "@/types";


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
                Padding
            </Typography>
            <Box sx={{
                display: "grid",
                gap: "12px",
                "grid-template-columns": "repeat(2, minmax(0, 1fr))"
            }}>
                <TextField
                    label="Padding Top"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="standard"
                    value={padding.top}
                    onChange={(e) => handlePaddingChange("top", parseInt(e.target.value))}
                />
                <TextField
                    label="Padding Bottom"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="standard"
                    value={padding.bottom}
                    onChange={(e) => handlePaddingChange("bottom", parseInt(e.target.value))}
                />
                <TextField
                    label="Padding Left"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="standard"
                    value={padding.left}
                    onChange={(e) => handlePaddingChange("left", parseInt(e.target.value))}
                />
                <TextField
                    label="Padding Right"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="standard"
                    value={padding.right}
                    onChange={(e) => handlePaddingChange("right", parseInt(e.target.value))}
                />
            </Box>
        </Box>
    );
};

