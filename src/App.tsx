import { CssBaseline, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Suspense, lazy } from "react";
import { styled } from "@mui/system";
import Header from "@/components/Header";
import CVDataInput from "@/components/CVDataInput";
import TerminalPromptCustomization from "@/components/TerminalPromptCustomization";
import TerminalPropertiesCustomization from "@/components/PropertiesCustomization.tsx";
import TerminalPreview from "@/components/TerminalPreview";
import { useStore } from "./store";
const GeneratedCodeModal = lazy(() => import('@/components/GeneratedCodeModal'));

const ScrollableGrid = styled(Grid)(({ theme }) => ({
  height: "calc(100vh - 64px)", // Deduct the header height
  overflowY: "auto",
  padding: theme.spacing(2),
  gap: theme.spacing(4),
  display: "grid",
}));

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      *::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }
      *::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0,0,0,0.00);
        border-radius: 10px;
      }
      *::-webkit-scrollbar-thumb {
        background-color: #62567a;
        border-radius: 6px;
      }
      *::-webkit-scrollbar-thumb:hover {
        background-color: #a395c4;
      }
      `,
    },
  },
});

function App() {
  const title = "Cv Terminal Builder";
  const githubUrl = "github.com";
  const isModalOpen=useStore<boolean>(state=>state.isModalOpen)

  return (
    <>
    <ThemeProvider theme={theme}>
    <CssBaseline />
      <Header title={title} githubUrl={githubUrl} />
      <Grid container>
        <ScrollableGrid item xs={3}>
          <TerminalPromptCustomization />
          <CVDataInput />
          <TerminalPropertiesCustomization />
        </ScrollableGrid>
        <Grid item xs={9}>
          <TerminalPreview />
        </Grid>
      </Grid>

      {isModalOpen &&
      
      <Suspense>
      <GeneratedCodeModal/>
      </Suspense>
      }

    </ThemeProvider>
    </>
  );
}

export default App;
