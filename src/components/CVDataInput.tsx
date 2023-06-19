import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import { CV } from "@/types";
import { useStore, type State } from "@/store";
import { fetchCVFromUrl, validateCV } from "@/composables";
import URLInput from "@/components/URLInput";
import FileUpload from "@/components/FileUpload";
import Box from "./Box";
export default function () {
  const [validationMessage, setValidationMessage] = useState<string>("");
  const [url, setURL] = useState<string>("");
  const setJsonCV = useStore((state: State) => state.setJsonCV);
  const createCommands = useStore((state: State) => state.createCommands);

  const reset = () => {
    setJsonCV({});
    createCommands([]);
    setURL("");
    setValidationMessage("");
  };

  const handleURL = async (url: string) => {
    reset();
    setURL(url);
    const cv: CV | null = await fetchCVFromUrl(url);

    if (!cv) {
      return setValidationMessage("Error fetching CV");
    }

    const isValid = validateCV(cv);

    if (!isValid) {
      return setValidationMessage("Invalid CV schema");
    }

    setJsonCV(cv);
    createCommands(Object.keys(cv));
  };

  const handleFile = (target: HTMLInputElement) => {
    reset();
    const file = target.files?.[0] || null;

    if (!file) {
      return setValidationMessage("Invalid JSON CV");
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const cv = JSON.parse(e.target?.result as string);
        const isValid = validateCV(cv);

        if (!isValid) {
          return setValidationMessage("Invalid CV schema");
        }

        setJsonCV(cv);
        createCommands(Object.keys(cv));
      } catch (error) {
        setValidationMessage("Error parsing JSON");
      }
    };
    reader.readAsText(file);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom component="div">
        CV
      </Typography>

      <Grid container gap={2}>
        <Grid item xs={12}>
          <Typography
            sx={{
              fontSize: 13,
            }}
          >
            Enter the URL of your CV data in JSON format or upload a JSON file
            directly.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <URLInput
            label="CV JSON URL"
            initialURL={url}
            handleURL={handleURL}
          />
        </Grid>
        <Grid item xs={12}>
          <FileUpload
            text="Upload CV JSON file"
            accept=".json"
            handleFile={handleFile}
          />
        </Grid>
        {validationMessage && (
          <Grid item xs={12}>
            <Typography color="error">{validationMessage}</Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
