import { TextField } from "@mui/material"

interface Props {
    onPromptChange: (prompt: string) => void;
    defaultValue: string;
}

export default function ({ onPromptChange, defaultValue }: Props) {
    return (
        <TextField
            label="Custom Prompt"
            variant="outlined"
            defaultValue={defaultValue}
            onChange={e => onPromptChange(e.target.value)}
        />
    );
};