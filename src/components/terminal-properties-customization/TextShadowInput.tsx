import { TextField } from '@mui/material';

export default function () {
    return (
        <>
            <TextField
                label="Text Shadow X-Offset"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="outlined"
            />
            <TextField
                label="Text Shadow Y-Offset"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="outlined"
            />
            <TextField
                label="Text Shadow Blur Radius"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="outlined"
            />
            <TextField
                label="Text Shadow Color"
                type="color"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="outlined"
            /></>
    );
};

