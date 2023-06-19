import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import URLInput from "./URLInput";
import FileUpload from "./FileUpload";

export default function () {
  const [validationMessage, setValidationMessage] = useState<string>("");

  return (
    <Grid container gap={2}>
      <Grid item xs={12}>
        <Typography variant="body1">Upload your CV</Typography>
        <Typography variant="body2">
          Enter the URL of your CV data in JSON format or upload a JSON file
          directly
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <URLInput setValidationMessage={setValidationMessage} />
      </Grid>
      <Grid item xs={12}>
        <FileUpload setValidationMessage={setValidationMessage} />
      </Grid>
      {validationMessage && (
        <Grid item xs={12}>
          <Typography color="error">{validationMessage}</Typography>
        </Grid>
      )}
    </Grid>
  );
}
