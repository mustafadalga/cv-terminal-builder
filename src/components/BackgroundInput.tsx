import { useState } from "react";
import { useStore, type State } from "@/store";
import URLInput from "@/components/URLInput";
import FileUpload from "@/components/FileUpload";
import { Grid, Typography } from "@mui/material";
import Box from "./Box";
import { Replay } from "@mui/icons-material";
import { HideImage } from "@mui/icons-material";
import { Image } from "@mui/icons-material";

export default function BackgroundInput() {
  const [validationMessage, setValidationMessage] = useState<string>("");
  const initialURL = useStore<string>(
    (state) => state.terminal.pageBackgroundImage
  );
  const [url, setURL] = useState<string>(initialURL || "");
  const setDefaultBackgroundImage = useStore(
    (state: State) => state.setDefaultBackgroundImage
  );
  const setPageBackgroundImage = useStore(
    (state: State) => state.setPageBackgroundImage
  );
  const isBackgroundImageEnabled = useStore(
    (state: State) => state.terminal.isBackgroundImageEnabled
  );
  const toggleBackgroundImage = useStore(
    (state: State) => state.toggleBackgroundImage
  );

  const resetForm = () => {
    setDefaultBackgroundImage();
    setURL("");
    setValidationMessage("");
  };

  const handleURL = async (url: string) => {
    resetForm();
    if (!url.length) {
      return setValidationMessage("Please enter a valid url!");
    }

    setURL(url);

    try {
      setPageBackgroundImage(url);
    } catch (error) {
      setValidationMessage("Error occurred while processing the file");
    }
  };

  const handleFile = (target: HTMLInputElement) => {
    resetForm();
    try {
      const file = target.files?.[0] || null;

      if (!file) {
        return setValidationMessage("Invalid background image");
      }

      setPageBackgroundImage(URL.createObjectURL(file));
    } catch (error) {
      setValidationMessage("Error occurred while processing the file");
    }
  };

  const toggleBackground = () => {
    toggleBackgroundImage(!isBackgroundImageEnabled);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom component="div">
        Background Image
      </Typography>
      <Grid container gap={2}>
        <Grid item xs={12}>
          <Typography
            sx={{
              fontSize: 13,
            }}
          >
            Enter the URL of background image or select a background image file
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <URLInput label="Image URL" initialURL={url} handleURL={handleURL} />
        </Grid>
        <Grid item xs={12}>
          <FileUpload
            text="Select background image"
            accept=".jpg, .jpeg, .png, .gif, .svg"
            handleFile={handleFile}
          />
        </Grid>
        <Grid item container xs={12} justifyContent="center" gap={1}>
          <Replay className="icon" onClick={resetForm} />

          {isBackgroundImageEnabled ? (
            <Image className="icon" onClick={() => toggleBackground()} />
          ) : (
            <HideImage className="icon" onClick={() => toggleBackground()} />
          )}
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
