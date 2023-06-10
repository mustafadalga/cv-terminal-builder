import { Button } from "@mui/material"

interface Props {
    onFileChange: (file: File | null) => void;
}

export default function ({ onFileChange }: Props) {
    return (
        <Button
            variant="contained"
            size="small"
            component="label">
            Upload File
            <input
                type="file"
                hidden
                onChange={e => onFileChange(e.target.files ? e.target.files[0] : null)}
            />
        </Button>
    );
};