import { SetState, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Terminal, MarginPadding, Border, Shadow, CV, Size } from "@/types";

interface State {
    terminal: Terminal;
    defaultCommands: string[];
    commands: string[];
    cv: CV;
    setPromptName: (name: string) => void;
    setFontFamily: (family: string) => void;
    setFontSize: (size: number) => void;
    setBodyBackground: (color: string) => void;
    setTerminalBackground: (color: string) => void;
    setTerminalTextColor: (color: string) => void;
    setTerminalCursorColor: (color: string) => void;
    setTextShadow: (shadow: Shadow) => void;
    setBoxShadow: (shadow: Shadow) => void;
    setTerminalBorder: (border: Border) => void;
    setTerminalBorderRadius: (radius: number) => void;
    setTerminalMargin: (margin: MarginPadding) => void;
    setTerminalPadding: (padding: MarginPadding) => void;
    setJsonCV: (cv: CV) => void;
   createCommands: (commands: string[]) => void;
    setTerminalSize: (size: Size) => void;
}

const createStore = create<State>()(devtools((set: SetState<State>) => ({
    terminal: {
        prompt: "root > ",
        fontFamily: "'Courier Prime', monospace",
        fontSize: 14,
        bodyBackground: "#000000",
        background: "#000000",
        textColor: "#00FF00",
        cursorColor: "rgba(0, 255, 0, 0.3)",
        textShadow: {
            xOffset: 0,
            yOffset: 0,
            blurRadius: 5,
            color: "#00FF00"
        },
        boxShadow: {
            xOffset: 0,
            yOffset: 0,
            blurRadius: 0,
            color: ""
        },
        borderRadius: 0,
        border: {
            style: "solid",
            width: 0,
            color: "#000000"
        },
                size:{
            cols: 120,
            rows: 40,
        },
        margin: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        },
        padding: {
            left: 15,
            right: 15,
            top: 15,
            bottom: 15
        }
    },
    defaultCommands:["help","fullcv"],
    commands: [],
    cv: {},
    setPromptName: (name: string) => set((state) => ({ terminal: { ...state.terminal, prompt: name } })),
    setFontFamily: (family: string) => set((state) => ({ terminal: { ...state.terminal, fontFamily: family } })),
    setFontSize: (size: number) => set((state) => ({ terminal: { ...state.terminal, fontSize: size } })),
    setBodyBackground: (color: string) => set((state) => ({ terminal: { ...state.terminal, bodyBackground: color } })),
    setTerminalBackground: (color: string) => set((state) => ({ terminal: { ...state.terminal, background: color } })),
    setTerminalTextColor: (color: string) => set((state) => ({ terminal: { ...state.terminal, textColor: color } })),
    setTerminalCursorColor: (color: string) => set((state) => ({
        terminal: {
            ...state.terminal,
            cursorColor: color
        }
    })),
    setTextShadow: (shadow: Shadow) => set((state) => ({ terminal: { ...state.terminal, textShadow: shadow } })),
    setBoxShadow: (shadow: Shadow) => set((state) => ({ terminal: { ...state.terminal, boxShadow: shadow } })),
    setTerminalBorder: (border: Border) => set((state) => ({ terminal: { ...state.terminal, border: border } })),
    setTerminalBorderRadius: (radius: number) => set((state) => ({
        terminal: {
            ...state.terminal,
            borderRadius: radius
        }
    })),
    setTerminalMargin: (margin: MarginPadding) => set((state) => ({ terminal: { ...state.terminal, margin: margin } })),
    setTerminalPadding: (padding: MarginPadding) => set((state) => ({
        terminal: {
            ...state.terminal,
            padding: padding
        }
    })),
    setJsonCV: (cv: CV) => set((state) => ({ ...state, cv })),
    createCommands: (commands: string[]) => set((state) => ({ ...state, commands: [...state.defaultCommands, ...commands] })),
  setTerminalSize: (size: Size) => set((state) => ({
        terminal: {
            ...state.terminal,
            size
        }
    })),
})));

export const useStore = createStore;
