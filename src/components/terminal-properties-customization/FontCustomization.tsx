import { TextField, Box, Typography } from '@mui/material';
import FontSizeInput from './FontSizeInput';
import FontFamilyInput from './FontFamilyInput';

export default function () {
    return (
        <Box sx={{
            p: 2,
            borderRadius: '5px',
            backdropFilter: 'blur(4px)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 12px 0 rgba(31, 38, 135, 0.37)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
        }}>
            <Typography variant="h6" gutterBottom component="div">
                Font
            </Typography>

            <Box sx={{
                display: "grid",
                gap: "12px",
                "grid-template-columns": "repeat(2, minmax(0, 1fr))",
                alignItems: "end"
            }}>
                <FontSizeInput/>
                <FontFamilyInput/>
            </Box>
        </Box>

    )
}