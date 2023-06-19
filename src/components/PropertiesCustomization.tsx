import { Grid } from "@mui/material";
import FontCustomization from "./FontCustomization";
import TextShadowInput from "./TextShadowInput";
import TerminalColorCustomization from "./ColorCustomization";
import BoxShadowCustomization from "./BoxShadowCustomization";
import BorderCustomization from "./BorderCustomization";
import MarginInput from "./MarginInput";
import PaddingInput from "./PaddingInput";
import SizeCustomization from "./SizeCustomization";
import BackgroundInput from "./BackgroundInput";
import GlassmorphismCustomization from "./GlassmorphismCustomization";



export default function () {
  return (
    <Grid container gap={5}>
      <Grid item xs={12}>
        <BackgroundInput />
      </Grid>
      <Grid item xs={12}>
        <TerminalColorCustomization />
      </Grid>
      <Grid item xs={12}>
        <GlassmorphismCustomization />
      </Grid>
      <Grid item xs={12}>
        <SizeCustomization />
      </Grid>
      <Grid item xs={12}>
        <FontCustomization />
      </Grid>
      <Grid item xs={12}>
        <TextShadowInput />
      </Grid>
      <Grid item xs={12}>
        <BoxShadowCustomization />
      </Grid>
      <Grid item xs={12}>
        <BorderCustomization />
      </Grid>
      <Grid item xs={12}>
        <MarginInput />
      </Grid>
      <Grid item xs={12}>
        <PaddingInput />
      </Grid>
    </Grid>
  );
}
