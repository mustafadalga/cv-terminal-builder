import { useStore } from "@/store";
import { GitHub } from "@mui/icons-material";
import { AppBar, Toolbar, Typography, IconButton, Button,styled } from "@mui/material";

interface Props {
  title: string;
  githubUrl: string;
}

const StyledAppBar = styled(AppBar)(() => ({
    background: "linear-gradient(45deg, #1976d2 30%, #0d47a1 90%)",
  }));

export default function Header({ title, githubUrl }: Props) {
  const setModalOpenStatus = useStore((state) => state.setModalOpenStatus);
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setModalOpenStatus(true)}
        >
          Generate Code
        </Button>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="github"
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHub />
        </IconButton>
      </Toolbar>
    </StyledAppBar>
  );
}
