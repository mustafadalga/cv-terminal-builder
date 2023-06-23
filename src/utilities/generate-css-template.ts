import type { State } from "@/store";
import type { RGBColor } from "@/types";
import { hexToRgb, mergeOpacityWithRGB } from ".";

export default function generateCSSTemplate(store: State): string {
    const TERMINAL_EXTRA_HEIGHT = 64;
    const pageBackgroundImage = store.terminal.isBackgroundImageEnabled
      ? `url('${store.terminal.pageBackgroundImage}') center/cover no-repeat fixed`
      : store.terminal.pageColor;
    const pageRGBBackgroundColor: RGBColor = hexToRgb(
      store.terminal.terminalColor
    );
    const pageRGBABackgroundColor = mergeOpacityWithRGB(
      pageRGBBackgroundColor,
      store.terminal.opacity
    );
    const terminalScreenBackgroundColor = pageRGBABackgroundColor;
    const terminalElementPadding = `${store.terminal.margin.top}px ${store.terminal.margin.right}px ${store.terminal.margin.bottom}px ${store.terminal.margin.left}px`;
    const terminalScreenPadding = `${store.terminal.padding.top}px ${store.terminal.padding.right}px ${store.terminal.padding.bottom}px ${store.terminal.padding.left}px`;
    const terminalScreenBorder = `${store.terminal.border.width}px ${store.terminal.border.style} ${store.terminal.border.color}`;
    const extractHeight: number =
      TERMINAL_EXTRA_HEIGHT +
      store.terminal.padding.top +
      store.terminal.padding.bottom;
    const terminalScreenMaxHeight = `calc(100vh - ${extractHeight}px)`;
    const terminalScreenBorderRadius = `${store.terminal.borderRadius}px`;
    const terminalScreenBoxShadow = `${store.terminal.boxShadow.xOffset}px ${store.terminal.boxShadow.yOffset}px ${store.terminal.boxShadow.blurRadius}px ${store.terminal.boxShadow.color}`;
    const terminalTextShadow = `${store.terminal.textShadow.xOffset}px ${store.terminal.textShadow.yOffset}px ${store.terminal.textShadow.blurRadius}px ${store.terminal.textShadow.color}`;
    const blur = `blur(${store.terminal.blur}px)`;
  
    const terminalAppearance = `
    #terminal {
      background: ${pageBackgroundImage};
      position: fixed;
      inset: 0;
    }
    .xterm-screen {
      background: ${terminalScreenBackgroundColor};
      backdrop-filter: ${blur};
      padding: ${terminalScreenPadding};
      border: ${terminalScreenBorder};
      border-radius: ${terminalScreenBorderRadius};
      box-shadow: ${terminalScreenBoxShadow};
      max-height: ${terminalScreenMaxHeight};
    }
    .terminal {
      padding: ${terminalElementPadding};
    }
    .xterm-rows {
      text-shadow: ${terminalTextShadow};
    }
    `;
  
    return terminalAppearance;
  }
  