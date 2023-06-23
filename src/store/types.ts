import type { CV } from "@/types";

export interface Border {
    style: string;
    width: number;
    color: string;
  }


  export interface Shadow {
    xOffset: number;
    yOffset: number;
    blurRadius: number;
    color: string;
  }
  
  export interface MarginPadding {
    left: number;
    right: number;
    top: number;
    bottom: number;
  }

  
  export interface Size {
    rows: number;
    cols: number;
  }
  export interface StateTerminal {
    prompt: string;
    fontFamily: string;
    fontSize: number;
    pageColor: string;
    defaultImage:string;
    isBackgroundImageEnabled:boolean;
    pageBackgroundImage: string;
    terminalColor: string;
    textColor: string;
    cursorColor: string;
    textShadow: Shadow;
    boxShadow: Shadow;
    borderRadius: number;
    border: Border;
    blur: number;
    opacity: number;
    size: Size;
    margin: MarginPadding;
    padding: MarginPadding;
  }
  
  export interface State {
    terminal: StateTerminal;
    defaultCommands: string[];
    commands: string[];
    cvSections: string[];
    cv: CV;
    isModalOpen: boolean;
    setPromptName: (name: string) => void;
    setFontFamily: (family: string) => void;
    setFontSize: (size: number) => void;
    setPageColor: (color: string) => void;
    toggleBackgroundImage: (status: boolean) => void;
    setPageBackgroundImage: (url: string) => void;
    setDefaultBackgroundImage: () => void;
    setTerminalBackground: (color: string) => void;
    setTerminalTextColor: (color: string) => void;
    setTerminalCursorColor: (color: string) => void;
    setTextShadow: (shadow: Shadow) => void;
    setBoxShadow: (shadow: Shadow) => void;
    setTerminalBorder: (border: Border) => void;
    setTerminalBorderRadius: (radius: number) => void;
    setTerminalMargin: (margin: MarginPadding) => void;
    setTerminalPadding: (padding: MarginPadding) => void;
    setOpacity: (opacity: number) => void;
    setBlur: (blur: number) => void;
    setJsonCV: (cv: CV) => void;
    createCommands: (commands: string[]) => void;
    setTerminalSize: (size: Size) => void;
    setModalOpenStatus: (isModalOpen: boolean) => void;
  }