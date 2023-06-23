import type {
  AddonConfig,
  CVConfig,
  CVTerminalConfig,
  XtermOptions,
} from "@/types";
import type { State, StateTerminal } from "@/store";
import { RefObject } from "react";
import { FitAddon } from "xterm-addon-fit";
import { WebLinksAddon } from "xterm-addon-web-links";

export function generateXtermOptions(terminal: StateTerminal): XtermOptions {
  return {
    fontSize: terminal.fontSize,
    fontFamily: terminal.fontFamily,
    cursorStyle: "block",
    cursorBlink: true,
    theme: {
      background: terminal.terminalColor,
      foreground: terminal.textColor,
      cursor: terminal.cursorColor,
    },
    cols: terminal.size.cols,
    rows: terminal.size.rows,
  };
}

export function generateCVIntegration(store: State): CVConfig {
  return {
    commands: store.commands,
    cvSections: store.cvSections,
    cv: store.cv,
    prompt: store.terminal.prompt,
  };
}

export function generateCVTerminalPreviewConfigurations(
  store: State,
  terminalRef: RefObject<HTMLDivElement>
): CVTerminalConfig {
  const addonsConfig: AddonConfig[] = [
    { instance: FitAddon, autoFit: true },
    { instance: WebLinksAddon },
  ];
  const xtermOptions = generateXtermOptions(store.terminal);
  const cvConfig = generateCVIntegration(store);

  return {
    terminal: xtermOptions,
    cv: cvConfig,
    addons: addonsConfig,
    container: terminalRef.current,
  };
}