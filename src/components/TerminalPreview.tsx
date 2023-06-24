import { useEffect, useRef } from "react";
import { useStore, type State } from "@/store";
import "@/assets/css/terminal.css";
import useTerminal from "@/composables/use-terminal";
import useApplyStyles from "@/composables/use-apply-styles";

export default function TerminalPreview() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const store = useStore<State>((state) => state);

  const setInitialTerminalScreenWidth = () => {
    if (terminalRef.current) {
      const terminalScreen: HTMLElement =
        terminalRef.current.querySelector(".xterm-screen")!;
      store.setTerminalScreenWidth(terminalScreen.offsetWidth);
    }
  };
  useTerminal(terminalRef);
  useEffect(() => {
    setInitialTerminalScreenWidth();
  }, [store.terminal.size]);

  useApplyStyles(terminalRef.current, store);


  return <div ref={terminalRef} id="terminal"></div>;
}
