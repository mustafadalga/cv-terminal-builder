import { Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useStore, type State } from "@/store";
import URLInput from "@/components/URLInput";
import FileUpload from "@/components/FileUpload";
import Box from "./Box";
import ReplayIcon from "@mui/icons-material/Replay";
import HideImageIcon from "@mui/icons-material/HideImage";
import ImageIcon from "@mui/icons-material/Image";

export default function BackgroundInput() {
  const [validationMessage, setValidationMessage] = useState<string>("");
  const [url, setURL] = useState<string>("");
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

  const reset = () => {
    setDefaultBackgroundImage();
    setURL("");
    setValidationMessage("");
  };

  const handleURL = async (url: string) => {
    reset();
    setURL(url);

    try {
      setPageBackgroundImage(url);
    } catch (error) {
      setValidationMessage("Error occurred while processing the file");
    }
  };

  const handleFile = (target: HTMLInputElement) => {
    reset();
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
        <Grid container xs={12} justifyContent="center" gap={1}>
         <ReplayIcon 
               className="icon"
                     onClick={reset} />

{isBackgroundImageEnabled ? 
<ImageIcon        className="icon"  onClick={() => toggleBackgroundImage(!isBackgroundImageEnabled)}/> : 
<HideImageIcon         className="icon"  onClick={() => toggleBackgroundImage(!isBackgroundImageEnabled)}/>}

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
