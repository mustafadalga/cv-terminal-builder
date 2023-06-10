import { Select, MenuItem } from '@mui/material';

const fontFamilies: string[] = [
    'Courier Prime', 'Cutive Mono', 'Roboto Mono',
    'Source Code Pro', 'Space Mono', 'Major Mono Display',
    'Fira Code', 'Ubuntu Mono', 'JetBrains Mono', 'Recursive'
];


export default function () {
    return (
        <Select
            labelId="font-family-label"
            id="font-family">
            {fontFamilies.map((fontFamily, index) => (
                <MenuItem key={index} value={fontFamily}>{fontFamily}</MenuItem>
            ))}
        </Select>
    );
};

