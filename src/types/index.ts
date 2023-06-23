export interface CV {
  [section: string]: string[];
}

export interface CVSchema {
  $schema: string;
  type: string;
  additionalProperties: {
    type: string;
    items: {
      type: string;
    };
  };
}

export interface RGBColor {
  r: number;
  g: number;
  b: number;
  a?: number;
}

export interface XtermOptions {
  fontFamily: string;
  fontSize: number;
  cursorStyle?: "block" | "underline" | "bar";
  cursorBlink: boolean;
  rows: number;
  cols: number;
  theme: {
    background: string;
    foreground: string;
    cursor: string;
  };
}

export interface CVConfig {
  commands: string[];
  cvSections: string[];
  cv: CV;
  prompt: string;
}
export interface AddonConfig {
  instance: new () => unknown;
  autoFit?: boolean;
}

export interface CVTerminalConfig {
  terminal: XtermOptions;
  cv: CVConfig;
  addons: AddonConfig[];
  container: HTMLDivElement | null;
}
