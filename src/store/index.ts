import { StoreApi, create } from "zustand";
import { devtools,persist } from "zustand/middleware";
import type {
  Border,
  Shadow,
  MarginPadding,
  Size,
  State,
} from "./types";
import type { CV } from "@/types";
export type {
  Border,
  Shadow,
  MarginPadding,
  Size,
  State,
  StateTerminal
} from "./types"

const createState = (set: StoreApi<State>["setState"]): State => ({
  terminal: {
    prompt: "root > ",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 12,
    pageColor: "#16213e",
    defaultImage:
      "https://images.unsplash.com/photo-1530692228265-084b21566b12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1926&q=80",
    isBackgroundImageEnabled: true,
    pageBackgroundImage: "https://images.unsplash.com/photo-1530692228265-084b21566b12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1926&q=80",
    terminalColor: "#16213e",
    textColor: "#00FF00",
    cursorColor: "#00FF00",
    opacity: 0.5,
    blur: 9,
    textShadow: {
      xOffset: 0,
      yOffset: 0,
      blurRadius: 0,
      color: "#00ff00",
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
      rows: 32,
    },
    margin: {
      left: 100,
      right: 40,
      top: 50,
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
  commands: ["help"],
  cvSections: [],
  cv: {},
  isModalOpen: false,
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
        isBackgroundImageEnabled: status,
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
  setModalOpenStatus: (isModalOpen: boolean) =>
    set((state) => ({
      ...state,
      isModalOpen,
    })),
});


const PERSISTED_STATE_KEY = "cv-terminal-builer";

const createStore = create(
  persist(
    devtools(createState),
    {
      name: PERSISTED_STATE_KEY
    }
  )
);


export const useStore = createStore;
