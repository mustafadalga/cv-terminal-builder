import { TextField } from "@mui/material"

interface Props {
    onUrlChange: (url: string) => void;
}


export default function ({ onUrlChange }: Props) {

    return (
        <TextField
            label="CV Data URL"
            variant="standard"
            size="small"
            inputProps={{ style: { fontSize: 12 } }}
            InputLabelProps={{ style: { fontSize: 13 } }}
            onChange={e => onUrlChange(e.target.value)}
        />
    );
};