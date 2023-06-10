import { Typography } from "@mui/material"

interface Props {
    defaultPrompt: string;
}

export default function ({ defaultPrompt }: Props) {
    return (
        <Typography>
            {defaultPrompt}
        </Typography>
    );
};

