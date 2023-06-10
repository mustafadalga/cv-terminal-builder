import { TextField } from '@mui/material';

export default function () {
    return (
        <>
            <TextField
                label="Padding Top"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="outlined"
            />
            <TextField
                label="Padding Bottom"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="outlined"
            />
            <TextField
                label="Padding Left"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="outlined"
            />
            <TextField
                label="Padding Right"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="outlined"
            />
        </>
    );
};

