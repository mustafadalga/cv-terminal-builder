import { useEffect, type RefObject } from "react";
import { CVTerminal } from "@/class/Terminal";
import { useStore, type State } from "@/store";
import { generateCVTerminalPreviewConfigurations } from "@/utilities/generate-code-utils";

export default function useTerminal(terminalRef: RefObject<HTMLDivElement>) {
  const store = useStore<State>((state) => state);

  useEffect(() => {
    if (!terminalRef.current) return;

    const config = generateCVTerminalPreviewConfigurations(store, terminalRef);
    const terminal = new CVTerminal(config);

    return () => terminal?.terminal.dispose();
  }, [terminalRef, store]);
}
