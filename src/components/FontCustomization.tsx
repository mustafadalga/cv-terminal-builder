import { Typography } from '@mui/material';
import FontSizeInput from './FontSizeInput';
import FontFamilyInput from './FontFamilyInput';
import Box from "./Box";
export default function () {
    return (
        <Box>
            <Typography variant="h6" gutterBottom component="div">
                Font
            </Typography>

            <Box sx={{
                display: "grid",
                gap: "12px",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                alignItems: "end"
            }}>
                <FontSizeInput/>
                <FontFamilyInput/>
            </Box>
        </Box>

    )
}