import { TextField } from '@mui/material';

export default function ()  {
    return (
        <TextField
            label="Foreground Color"
            type="color"
            InputLabelProps={{
                shrink: true,
            }}
            variant="outlined"
        />
    );
};

