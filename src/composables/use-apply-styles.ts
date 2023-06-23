import type { State } from "@/store";
import { useEffect } from "react";
import { mergeOpacityWithRGB, hexToRgb } from "@/utilities";
import type { RGBColor } from "@/types";

export default function useApplyStyles(
  terminalContainer: HTMLDivElement | null,
  store: State
) {

  useEffect(() => {

    if(!terminalContainer) return;

    const terminalElement: HTMLElement | null =
      terminalContainer.querySelector(".xterm.terminal");
    const terminalScreen: HTMLElement | null=
      terminalContainer.querySelector(".xterm-screen");
    const terminalRows: NodeListOf<HTMLElement> =
      terminalContainer.querySelectorAll(".xterm-rows");
    const textArea: HTMLTextAreaElement = terminalContainer.querySelector(
      ".xterm-helper-textarea"
    )!;

    if (terminalElement && terminalScreen) {
      textArea.style.opacity = "0";

      if (store.terminal.isBackgroundImageEnabled) {
        terminalContainer.style.background = `url(${store.terminal.pageBackgroundImage}) center/cover no-repeat fixed`;

      } else {
        terminalContainer.style.backgroundColor = store.terminal.pageColor;
        terminalContainer.style.backgroundImage = "unset";
      }

      const rgbColor: RGBColor = hexToRgb(store.terminal.terminalColor);
      const rgbaColor = mergeOpacityWithRGB(rgbColor, store.terminal.opacity);
      terminalScreen.style.backgroundColor = rgbaColor;

      terminalScreen.style.backdropFilter = `blur(${store.terminal.blur}px)`;

      terminalElement.style.padding = `${store.terminal.margin.top}px ${store.terminal.margin.right}px ${store.terminal.margin.bottom}px ${store.terminal.margin.left}px`;

      terminalScreen.style.padding = `${store.terminal.padding.top}px ${store.terminal.padding.right}px ${store.terminal.padding.bottom}px ${store.terminal.padding.left}px`;

      terminalScreen.style.borderStyle = store.terminal.border.style;
      terminalScreen.style.borderWidth = `${store.terminal.border.width}px`;
      terminalScreen.style.borderColor = store.terminal.border.color;
      const TERMINAL_EXTRA_HEIGHT = 64;
      const extractHeight: number =
        TERMINAL_EXTRA_HEIGHT +
        store.terminal.padding.top +
        store.terminal.padding.bottom;
      terminalScreen.style.maxHeight = `calc(100vh - ${extractHeight}px`;

      terminalScreen.style.borderRadius = `${store.terminal.borderRadius}px`;

      terminalScreen.style.boxShadow = `${store.terminal.boxShadow.xOffset}px ${store.terminal.boxShadow.yOffset}px ${store.terminal.boxShadow.blurRadius}px ${store.terminal.boxShadow.color}`;

      terminalRows.forEach((row) => {
        row.style.textShadow = `${store.terminal.textShadow.xOffset}px ${store.terminal.textShadow.yOffset}px ${store.terminal.textShadow.blurRadius}px ${store.terminal.textShadow.color}`;
      });
    }
  }, [terminalContainer, store]);
}
