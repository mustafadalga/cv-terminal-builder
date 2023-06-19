import GitHubIcon from '@mui/icons-material/GitHub';
import { AppBar, Toolbar, Typography, IconButton,Button } from '@mui/material';

interface Props {
    title: string;
    githubUrl: string;
}

export default function ({ title, githubUrl }: Props) {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    {title}
                </Typography>
                <Button variant="contained" color="primary" >
                    Generate Code
                </Button>
                <IconButton edge="end" color="inherit" aria-label="github" href={githubUrl} target="_blank"
                            rel="noopener noreferrer">
                    <GitHubIcon/>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

