import { Typography } from "@mui/material"

interface Props {
    message: string;
}

export default function  ({ message }:Props) {
    return (
        <Typography color="error">
            {message}
        </Typography>
    );
};