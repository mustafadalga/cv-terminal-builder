import { CloudUpload } from "@mui/icons-material";
import { Button } from "@mui/material";
import { ChangeEvent } from "react";

interface Props {
  text: string;
  accept: string;
  handleFile: (target: HTMLInputElement) => void;
}

export default function FileUpload(props: Props) {
  const { text, accept, handleFile } = props;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFile(event.target);
  };

  return (
    <Button
      size="small"
      variant="outlined"
      component="label"
      style={{ gap: 6 }}
      fullWidth
    >
      <CloudUpload style={{ fontSize: 18 }} />
      { text }
      <input
        type="file"
        hidden
        onChange={handleChange}
        accept={accept}
      />
    </Button>
  );
}
