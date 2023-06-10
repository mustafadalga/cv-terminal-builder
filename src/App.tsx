import { CssBaseline, Grid } from '@mui/material';
import { styled } from "@mui/system"
import Header from "@/components/Header";
import Main from "@/components/Main";
import CVDataInput from '@/components/CVDataInput';
import TerminalPromptCustomization from '@/components/TerminalPromptCustomization';
import TerminalPropertiesCustomization from '@/components/TerminalPropertiesCustomization';
import TerminalPreview from '@/components/TerminalPreview';


const CustomGrid = styled(Grid)(({ theme }) => ({
    '&.MuiGrid-root': {
        height: '100vh',
        padding: theme.spacing(2),
    },
    '&.MuiGrid-item': {
        overflow: 'auto',
    },
}));

function App() {
    const title: string = "Cv Terminal Builder";
    const githubUrl: string = "github.com";

    return (
        <>
            <CssBaseline />
            <Header title={title}
                    githubUrl={githubUrl}/>
            <CustomGrid container spacing={4}>

                <CustomGrid item xs={3}>
                    <CVDataInput />
                    <TerminalPromptCustomization />
                    <TerminalPropertiesCustomization />
                </CustomGrid>
                <CustomGrid item xs={9}>
                    <TerminalPreview />
                </CustomGrid>
            </CustomGrid>
            </>
    )
}

export default App

