import { Grid, Button, TextField } from "@mui/material";
import { CloudUploadOutlined } from "@mui/icons-material";
import { CV } from "@/types";
import { useStore } from "@/store";
import { useState } from "react";
import { validateCV } from "@/composables";

interface Props {
  setValidationMessage: (message: string) => void;
}

async function fetchCVFromUrl(url: string): Promise<CV | null> {
  try {
    const response = await fetch(url);
    const cv: CV = await response.json();
    console.log(cv);
    return cv;
  } catch (error) {
    return null;
  }
}

export default function ({ setValidationMessage }: Props) {
  const [cvUrl, setCvUrl] = useState<string>("");
  const setJsonCV = useStore((state) => state.setJsonCV);
  const createCommands = useStore((state) => state.createCommands);

  const resetStore = () => {
    setJsonCV({});
    createCommands([]);
  };

  const handleURL = async () => {
    resetStore();
    setValidationMessage("");
    const cv = await fetchCVFromUrl(cvUrl);
    if (cv) {
      const isValid = validateCV(cv);
      if (isValid) {
        setJsonCV(cv);
        createCommands(Object.keys(cv));
      } else {
        setValidationMessage("Invalid CV schema");
      }
    } else {
      setValidationMessage("Error fetching CV");
    }
  };

  return (
    <Grid container xs={12} alignItems="flex-end">
      <Grid item xs={10}>
        <TextField
          label="CV Data URL"
          variant="standard"
          size="small"
          fullWidth
          inputProps={{ style: { fontSize: 12 } }}
          InputLabelProps={{ style: { fontSize: 13 } }}
          onChange={(e) => setCvUrl(e.target.value)}
        />
      </Grid>
      <Grid item xs={2}>
        <Button
          size="small"
          variant="outlined"
          component="label"
          fullWidth
          onClick={handleURL}
        >
          <CloudUploadOutlined style={{ fontSize: 18 }} />
        </Button>
      </Grid>
    </Grid>
  );
}
