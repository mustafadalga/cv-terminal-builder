import { TextField } from '@mui/material';

export default function ()  {
    return (
        <TextField
            label="Border Radius"
            type="number"
            InputLabelProps={{
                shrink: true,
            }}
            variant="outlined"
        />
    );
};

