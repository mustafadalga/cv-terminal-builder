import { Modal,Box,Button } from '@mui/material';



export default function (){
    return(
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-description">
            <Box >
                <h2 id="modal-title">Generated Code</h2>
                <pre id="modal-description">
            {/* Use PrismJS to highlight the code */}
        </pre>
                <Button variant="contained" color="primary">
                    Copy to Clipboard
                </Button>
                {/* Add a download button if you like */}
            </Box>
        </Modal>
    )
}