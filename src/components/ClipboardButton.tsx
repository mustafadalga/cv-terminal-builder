import { useEffect, useState } from "react";
import {
  Typography,
  styled,
  Box,
} from "@mui/material";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import CheckIcon from "@mui/icons-material/Check";

const StyledCopyButton = styled(Box)(({ theme }) => ({
  color: "#fff",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  marginLeft: "auto",
  cursor: "pointer",
}));

export default function ClipboardButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let timeoutId:ReturnType<typeof setTimeout>;
    if (copied) {
      timeoutId = setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [copied]);

  const handleCopyClick = () => {
    if (copied) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
  };

  return (
    <StyledCopyButton onClick={handleCopyClick}>
      {copied ? (
        <>
          <CheckIcon />
          <Typography variant="subtitle1">Copied!</Typography>
        </>
      ) : (
        <>
          <ContentPasteIcon />
          <Typography variant="subtitle1">Copy code</Typography>
        </>
      )}
    </StyledCopyButton>
  );
}
