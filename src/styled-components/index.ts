import {
    Modal,
    Box,
    styled,
    Typography,
    IconButton,
  } from "@mui/material";
export const StyledModal = styled(Modal)(() => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& .MuiPaper-root": {
      backgroundColor: "transparent",
      boxShadow: "none",
      overflow: "hidden",
      color: "#fff",
    },
  }));
  
  export const StyledBox = styled(Box)(() => ({
    backgroundColor: "#1976d2",
    borderRadius: "10px",
    padding: "16px",
    position: "relative",
    width: "80vw",
    maxWidth: "1200px",
    boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)",
    backdropFilter: "blur(10px)",
    background: "linear-gradient(45deg, #1976d2 30%, #0d47a1 90%)",
  }));
  
  export const CodeBox = styled(Box)(() => ({
    borderRadius: "10px",
    color: "#fff",
    overflow: "auto",
    maxHeight: "70vh",
    position: "relative",
    "& pre": {
      whiteSpace: "pre-wrap",
      wordWrap: "break-word",
      margin: 0,
    },
  }));
  
  export const StyledTypography = styled(Typography)(({ theme }) => ({
    color: "#fff",
    marginBottom: theme.spacing(1),
    textAlign: "center",
  }));
  
  export const StyledCloseButton = styled(IconButton)(() => ({
    position: "absolute",
    top: 12,
    right: 12,
    color: "#fff",
  }));



  export const StyledClipboardButtonContainer = styled(Box)({
    display: "flex",
    marginRight: "10px",
  });
  