import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { CloudUploadOutlined } from "@mui/icons-material";

interface Props {
  label: string;
  initialURL: string;
  handleURL: (url: string) => void;
}

export default function URLInput(props: Props) {
  const { label, initialURL, handleURL } = props;
  const [url, setURL] = useState<string>(initialURL);

  

  return (
    <Grid container alignItems="flex-end">
      <Grid item xs={10}>
        <TextField
          label={label}
          variant="standard"
          size="small"
          fullWidth
          value={url}
          inputProps={{ style: { fontSize: 12 } }}
          InputLabelProps={{ style: { fontSize: 13 } }}
          onChange={(e) => setURL(e.target.value)}
        />
      </Grid>
      <Grid item xs={2}>
        <Button
          size="small"
          variant="outlined"
          component="label"
          fullWidth
          onClick={()=>handleURL(url)}
        >
          <CloudUploadOutlined style={{ fontSize: 18 }} />
        </Button>
      </Grid>
    </Grid>
  );
}
