import { CssBaseline, Grid } from '@mui/material';
import { styled } from "@mui/system"
import Header from "@/components/Header";
import CVDataInput from '@/components/cv-data-input/CVDataInput';
import TerminalPromptCustomization from '@/components/terminal-prompt-customization/TerminalPromptCustomization';
import TerminalPropertiesCustomization
    from '@/components/terminal-properties-customization/PropertiesCustomization.tsx';
import TerminalPreview from '@/components/TerminalPreview';


const ScrollableGrid = styled(Grid)(({ theme }) => ({
    height: 'calc(100vh - 64px)', // Deduct the header height
    overflowY: 'scroll',
    padding: theme.spacing(2),
    gap: theme.spacing(4),
    display: 'grid',
}));


function App() {
    const title: string = "Cv Terminal Builder";
    const githubUrl: string = "github.com";

    return (
        <>
            <CssBaseline/>
            <Header title={title}
                    githubUrl={githubUrl}/>
            <Grid container>
                <ScrollableGrid item xs={3}>
                    <CVDataInput/>
                    <TerminalPromptCustomization/>
                    <TerminalPropertiesCustomization/>
                </ScrollableGrid>
                <Grid item xs={9}>
                    <TerminalPreview/>
                </Grid>
            </Grid>
        </>
    )
}

export default App

