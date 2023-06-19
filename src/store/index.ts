import { SetState, create } from "zustand";
import { devtools } from "zustand/middleware";
import { Terminal, MarginPadding, Border, Shadow, CV, Size } from "@/types";

export interface State {
  terminal: Terminal;
  defaultCommands: string[];
  commands: string[];
  cvSections: string[];
  cv: CV;
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
}

const createState = (set: SetState<State>): State => ({
  terminal: {
    prompt: "root > ",
    fontFamily: "'Courier Prime', monospace",
    fontSize: 14,
    pageColor: "#16213e",
    defaultImage:
      "https://images.unsplash.com/photo-1530692228265-084b21566b12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1926&q=80",
    isBackgroundImageEnabled: false,
    pageBackgroundImage: "",
    terminalColor: "#16213e",
    textColor: "#00FF00",
    cursorColor: "#00FF00",
    opacity: 0.5,
    blur: 9,
    textShadow: {
      xOffset: 0,
      yOffset: 0,
      blurRadius: 5,
      color: "#000000",
    },
    boxShadow: {
      xOffset: 0,
      yOffset: 0,
      blurRadius: 10,
      color: "#021A32",
    },
    borderRadius: 12,
    border: {
      style: "solid",
      width: 1,
      color: "#00ff00",
    },
    size: {
      cols: 120,
      rows: 40,
    },
    margin: {
      left: 40,
      right: 40,
      top: 32,
      bottom: 12,
    },
    padding: {
      left: 15,
      right: 15,
      top: 15,
      bottom: 15,
    },
  },
  defaultCommands: ["help", "fullcv"],
  commands: [],
  cvSections: [],
  cv: {},
  setPromptName: (name: string) =>
    set((state) => ({ terminal: { ...state.terminal, prompt: name } })),
  setFontFamily: (family: string) =>
    set((state) => ({ terminal: { ...state.terminal, fontFamily: family } })),
  setFontSize: (size: number) =>
    set((state) => ({ terminal: { ...state.terminal, fontSize: size } })),
  setPageColor: (color: string) =>
    set((state) => ({
      terminal: { ...state.terminal, pageColor: color },
    })),
    toggleBackgroundImage: (status: boolean) =>
    set((state) => ({
      terminal: { 
        ...state.terminal,
        isBackgroundImageEnabled: status
         },
    })),
  setPageBackgroundImage: (url: string) =>
    set((state) => ({
      terminal: { ...state.terminal, pageBackgroundImage: url },
    })),
  setDefaultBackgroundImage: () =>
    set((state) => ({
      terminal: {
        ...state.terminal,
        isBackgroundImageEnabled: true,
        pageBackgroundImage: state.terminal.defaultImage,
      },
    })),
  setTerminalBackground: (color: string) =>
    set((state) => ({ terminal: { ...state.terminal, terminalColor: color } })),
  setTerminalTextColor: (color: string) =>
    set((state) => ({ terminal: { ...state.terminal, textColor: color } })),
  setTerminalCursorColor: (color: string) =>
    set((state) => ({
      terminal: {
        ...state.terminal,
        cursorColor: color,
      },
    })),
  setTextShadow: (shadow: Shadow) =>
    set((state) => ({ terminal: { ...state.terminal, textShadow: shadow } })),
  setBoxShadow: (shadow: Shadow) =>
    set((state) => ({ terminal: { ...state.terminal, boxShadow: shadow } })),
  setTerminalBorder: (border: Border) =>
    set((state) => ({ terminal: { ...state.terminal, border: border } })),
  setTerminalBorderRadius: (radius: number) =>
    set((state) => ({
      terminal: {
        ...state.terminal,
        borderRadius: radius,
      },
    })),
  setTerminalMargin: (margin: MarginPadding) =>
    set((state) => ({ terminal: { ...state.terminal, margin: margin } })),
  setTerminalPadding: (padding: MarginPadding) =>
    set((state) => ({
      terminal: {
        ...state.terminal,
        padding,
      },
    })),
  setOpacity: (opacity: number) =>
    set((state) => ({
      terminal: {
        ...state.terminal,
        opacity,
      },
    })),
  setBlur: (blur: number) =>
    set((state) => ({
      terminal: {
        ...state.terminal,
        blur,
      },
    })),
  setJsonCV: (cv: CV) => set((state) => ({ ...state, cv })),
  createCommands: (commands: string[]) =>
    set((state) => ({
      commands: [...state.defaultCommands, ...commands],
      cvSections: commands,
    })),
  setTerminalSize: (size: Size) =>
    set((state) => ({
      terminal: {
        ...state.terminal,
        size,
      },
    })),
});

const createStore = create(devtools(createState));

createStore.getState().setDefaultBackgroundImage();

export const useStore = createStore;
