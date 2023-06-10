import { TextField } from '@mui/material';

interface Props {
    onFontSizeChange: (size: string) => void;
}

export default function ({ onFontSizeChange }: Props) {
    return (
        <TextField
            label="Font Size"
            type="number"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            onChange={e => onFontSizeChange(e.target.value)}
        />
    );
}