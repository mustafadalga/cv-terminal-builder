import { TextField } from '@mui/material';
import { useState } from "react";

interface Props {
    onDimensionsChange: (cols: string, rows: string) => void;
}

export default function ({ onDimensionsChange }: Props) {
    const [ cols, setCols ] = useState("");
    const [ rows, setRows ] = useState("");

    const handleDimensionsChange = () => {
        onDimensionsChange(cols, rows);
    };

    return (
        <div>
            <TextField
                label="Columns"
                type="number"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                onChange={e => {
                    setCols(e.target.value);
                    handleDimensionsChange();
                }}
            />
            <TextField
                label="Rows"
                type="number"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                onChange={e => {
                    setRows(e.target.value);
                    handleDimensionsChange();
                }}
            />
        </div>
    );
};