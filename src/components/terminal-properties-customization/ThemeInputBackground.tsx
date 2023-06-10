import { TextField } from '@mui/material';

export default function ()  {
    return (
        <TextField
            label="Background Color"
            type="color"
            InputLabelProps={{
                shrink: true,
            }}
            variant="outlined"
        />
    );
};

