import { useEffect, useRef } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import { useStore, type State } from "@/store";
import {
  StyledModal,
  StyledBox,
  CodeBox,
  StyledTypography,
  StyledCloseButton,
  StyledClipboardButtonContainer,
} from "@/styled-components";

import CloseIcon from "@mui/icons-material/Close";
import ClipboardButton from "./ClipboardButton";
import {
  generateCVIntegration,
  generateXtermOptions,
} from "@/utilities/generate-code-utils";
import generateHTMLTemplate from "@/utilities/generate-html-template";
import generateGoogleFontsLink from "@/utilities/generate-google-font-link";
import generateJSTemplate from "@/utilities/generate-js-template";
import generateCSSTemplate from "@/utilities/generate-css-template";

export default function GeneratedCodeModal() {
  const store = useStore<State>((state) => state);
  const setModalOpenStatus = useStore((state) => state.setModalOpenStatus);
  const codeRef = useRef(null);
  const xtermOptions = generateXtermOptions(store.terminal);
  const cvIntegrations = generateCVIntegration(store);
  const link = generateGoogleFontsLink(store.terminal.fontFamily);
  const js = generateJSTemplate(xtermOptions, cvIntegrations);
  const css = generateCSSTemplate(store);
  const generatedCode = generateHTMLTemplate({
    link,
    css,
    js,
  });

  useEffect(() => {
    setTimeout(() => {
      if (codeRef.current) {
        Prism.highlightElement(codeRef.current);
      }
    }, 0);
  }, [generatedCode]);

  return (
    <StyledModal open={true} onClose={() => setModalOpenStatus(false)}>
      <StyledBox>
        <StyledCloseButton onClick={() => setModalOpenStatus(false)}>
          <CloseIcon />
        </StyledCloseButton>
        <StyledTypography variant="h4">Generated Code</StyledTypography>
        <StyledClipboardButtonContainer>
          <ClipboardButton code={generatedCode} />
        </StyledClipboardButtonContainer>
        <CodeBox>
          <pre>
            <code ref={codeRef} className="language-javascript">
              {generatedCode}
            </code>
          </pre>
        </CodeBox>
      </StyledBox>
    </StyledModal>
  );
}
