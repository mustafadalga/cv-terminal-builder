import type { Border, MarginPadding, Shadow, State } from "@/store";
import { useEffect } from "react";
import { mergeOpacityWithRGB, hexToRgb } from "@/utilities";
import type { RGBColor } from "@/types";

interface BackgroundStyles {
  isBackgroundImageEnabled: boolean;
  pageBackgroundImage: string;
  pageColor: string;
}
interface ScreenStyles {
  terminalScreen: HTMLElement;
  screenWidth:number;
  terminalColor: string;
  opacity: number;
  padding: MarginPadding;
  border: Border;
  blur: number;
  borderRadius: number;
  boxShadow: Shadow;
}

function applyBackgroundStyles(
  terminalContainer: HTMLDivElement,
  { isBackgroundImageEnabled, pageBackgroundImage, pageColor }: BackgroundStyles
) {
  if (isBackgroundImageEnabled) {
    terminalContainer.style.background = `url(${pageBackgroundImage}) center/cover no-repeat fixed`;
  } else {
    terminalContainer.style.backgroundColor = pageColor;
    terminalContainer.style.backgroundImage = "unset";
  }
}

function applyScreenStyles({
  terminalScreen,
  screenWidth,
  terminalColor,
  opacity,
  padding,
  border,
  blur,
  borderRadius,
  boxShadow,
}: ScreenStyles) {
  const terminalColorRGB: RGBColor = hexToRgb(terminalColor);
  const TERMINAL_EXTRA_HEIGHT = 64;
  terminalScreen.style.backgroundColor = mergeOpacityWithRGB(
    terminalColorRGB,
    opacity
  );

  terminalScreen.style.width = `${screenWidth}px`;

  terminalScreen.style.backdropFilter = `blur(${blur}px)`;
  terminalScreen.style.padding = `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`;
  terminalScreen.style.borderStyle = border.style;
  terminalScreen.style.borderWidth = `${border.width}px`;
  terminalScreen.style.borderColor = border.color;
  terminalScreen.style.maxHeight = `calc(100vh - ${
    TERMINAL_EXTRA_HEIGHT + padding.top + padding.bottom
  }px`;
  terminalScreen.style.borderRadius = `${borderRadius}px`;
  terminalScreen.style.boxShadow = `${boxShadow.xOffset}px ${boxShadow.yOffset}px ${boxShadow.blurRadius}px ${boxShadow.color}`;
}

function applyElementStyles(
  terminalElement: HTMLElement,
  margin: MarginPadding
) {
  terminalElement.style.padding = `${margin.top}px ${margin.right}px ${margin.bottom}px ${margin.left}px`;
}

function applyRowsStyles(
  terminalRows: NodeListOf<HTMLElement>,
  textShadow: Shadow
) {
  terminalRows.forEach((row) => {
    row.style.textShadow = `${textShadow.xOffset}px ${textShadow.yOffset}px ${textShadow.blurRadius}px ${textShadow.color}`;
  });
}

export default function useApplyStyles(
  terminalContainer: HTMLDivElement | null,
  store: State
) {
  useEffect(() => {
    if (!terminalContainer) return;

    const terminalElement: HTMLElement | null =
      terminalContainer.querySelector(".xterm.terminal");
    const terminalScreen: HTMLElement | null =
      terminalContainer.querySelector(".xterm-screen");
    const terminalRows: NodeListOf<HTMLElement> =
      terminalContainer.querySelectorAll(".xterm-rows");
    const textArea: HTMLTextAreaElement = terminalContainer.querySelector(
      ".xterm-helper-textarea"
    )!;

    if (terminalElement && terminalScreen) {
      textArea.style.opacity = "0";

      const { isBackgroundImageEnabled, pageBackgroundImage, pageColor } =
        store.terminal;
      applyBackgroundStyles(terminalContainer, {
        isBackgroundImageEnabled,
        pageBackgroundImage,
        pageColor,
      });

      const {
        terminalColor,
        screenWidth,
        opacity,
        padding,
        border,
        blur,
        borderRadius,
        boxShadow,
      } = store.terminal;
      applyScreenStyles({
        terminalScreen,
        screenWidth,
        terminalColor,
        opacity,
        padding,
        border,
        blur,
        borderRadius,
        boxShadow,
      });

      applyElementStyles(terminalElement, store.terminal.margin);

      applyRowsStyles(terminalRows, store.terminal.textShadow);
    }
  }, [terminalContainer, store]);
}
