import { Terminal } from "xterm";
import type { AddonConfig, CVTerminalConfig } from "@/types";

export class CVTerminal {
  terminal!: Terminal;
  private isAnimating!: boolean;
  private command!: string;
  private addons!: Record<string, unknown>;
  private addonsConfig!: AddonConfig[];
  private prompt!: string;
  private promptLength!: number;
  private cursorX!: number;
  private printingFullCV!: boolean;
  private interrupted!: boolean;
  private commands!: Set<string>;
  private cvSections!: Set<string>;
  private cv!: Record<string, string[]>;
  private currentSectionIndex!: number;
  private animationFrameId!: number;

  constructor(private config: CVTerminalConfig) {
    this.initializeProperties();
    this.installAddons();
    this.openTerminal(config.container!);
    this.fitTerminal();
    this.registerEvents();
    this.writeWelcomeMessage();
  }

  fitTerminal() {
    const fitAddon = this.addons["FitAddon"] as any;
    fitAddon?.fit();
  }

  openTerminal(container: HTMLElement) {
    this.terminal.open(container);
    this.terminal.focus();
  }
  writeWelcomeMessage() {
    this.terminal.writeln("Welcome to My CV!");
    this.terminal.writeln("Type 'help' to see available commands.");
    this.writePrompt();
  }
  private initializeProperties() {
    this.terminal = new Terminal(this.config.terminal);
    this.isAnimating = false;
    this.command = "";
    this.addons = {};
    this.addonsConfig = this.config.addons;
    this.prompt = this.config.cv.prompt;
    this.promptLength = this.prompt.length;
    this.cursorX = this.promptLength;
    this.printingFullCV = false;
    this.interrupted = false;
    this.commands = new Set(this.config.cv.commands);
    this.cvSections = new Set(this.config.cv.cvSections);
    this.cv = this.config.cv.cv;
    this.currentSectionIndex = 0;
    this.animationFrameId = -1;
  }

  private installAddons() {
    this.addons = {};
    for (const addon of this.addonsConfig) {
      const addonInstance = new addon.instance();
      this.addons[addon.instance.name] = addonInstance;
      this.terminal.loadAddon(addonInstance as any);
      if (addon.autoFit) {
        (addonInstance as any).fit();
      }
    }
  }

  registerEvents() {
    this.terminal.onKey((event) => this.handleKeyEvent(event));
    window.addEventListener("resize", () => this.fitTerminal());

    document.addEventListener("click", (event) => {
      const isTerminalClick = event
        .composedPath()
        .some((el) => el === this.terminal.element);
      if (isTerminalClick) {
        this.terminal.focus();
      } else if (!isTerminalClick) {
        this.terminal.blur();
      }
    });
  }

  private handleKeyEvent({
    key,
    domEvent,
  }: {
    key: string;
    domEvent: KeyboardEvent;
  }) {
    const isCtrlC = domEvent.ctrlKey && domEvent.key.toLowerCase() === "c";
    const isPrintable =
      !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey;

    const KEYCODE = {
      Backspace: "Backspace",
      Enter: "Enter",
      ArrowUp: "ArrowUp",
      ArrowDown: "ArrowDown",
      ArrowLeft: "ArrowLeft",
      ArrowRight: "ArrowRight",
    };

    if (this.isAnimating && isCtrlC) {
      return this.interruptAnimation();
    }
    if (this.isAnimating) return;

    switch (domEvent.key) {
      case KEYCODE.Backspace:
        this.handleBackspace();
        break;
      case KEYCODE.Enter:
        this.handleReturn();
        break;
      case KEYCODE.ArrowUp:
      case KEYCODE.ArrowDown:
      case KEYCODE.ArrowLeft:
      case KEYCODE.ArrowRight:
        break;

      default:
        if (isPrintable) {
          this.handleInput(key);
        }
    }
  }
  private stopAnimation() {
    this.interrupted = false;
    this.isAnimating = false;
    cancelAnimationFrame(this.animationFrameId);
    this.resetFullCV();
  }

  private handleBackspace() {
    if (this.cursorX > this.promptLength) {
      this.terminal.write("\b \b");
      this.cursorX--;
    }
  }

  private handleReturn() {
    this.terminal.writeln("");
    this.handleCommand();
    this.command = "";
    this.cursorX = this.promptLength;
    if (!this.isAnimating) {
      this.writePrompt();
    }
  }

  private handleInput(key: string) {
    this.terminal.write(key);
    this.command += key;
    this.cursorX++;
  }

  private writePrompt() {
    this.terminal.write(this.prompt);
  }

  private handleCommand() {
    const trimmedCommand = this.command.trim();

    if (this.commands.has(trimmedCommand)) {
      switch (trimmedCommand) {
        case "help":
          this.writeHelp();
          break;
        case "fullcv":
          this.startFullCV();
          break;
        default:
          this.writeSection(trimmedCommand);
      }
    } else {
      this.terminal.writeln(`💡  Command not recognized: ${trimmedCommand}!`);
      this.terminal.writeln("Type 'help' to see available commands.");
    }
  }

  private writeHelp() {
    let helpText = `\n  AVAILABLE COMMANDS:\n\n`;
    for (const cmd of this.commands) {
      helpText += `- ${cmd}\n`;
    }

    this.isAnimating = true;
    this.animateTyping(helpText, 0, () => {
      this.isAnimating = false;
      this.writePrompt();
    });
  }

  private startFullCV() {
    this.printingFullCV = true;
    this.handleFullCVCommand();
  }

  private writeSection(sectionName: string): void {
    const section = `\n  ${sectionName.toUpperCase()}:`;
    this.terminal.writeln(section);
    const commandInfo = `\r\n${this.cv[sectionName].join("\n")}`;

    if (this.interrupted) return;

    this.isAnimating = true;
    this.animateTyping(commandInfo, 0, () => {
      this.isAnimating = false;
      if (this.printingFullCV) {
        this.handleFullCVCommand();
      } else {
        this.writePrompt();
      }
    });
  }

  private handleFullCVCommand() {
    const cvSectionsArray = Array.from(this.cvSections);

    if (this.currentSectionIndex >= cvSectionsArray.length) {
      this.resetFullCV();
      this.writePrompt();
    } else {
      this.printingFullCV = true;
      const command = cvSectionsArray[this.currentSectionIndex];
      this.currentSectionIndex++;
      this.writeSection(command);
    }
  }

  private resetFullCV() {
    this.currentSectionIndex = 0;
    this.printingFullCV = false;
  }

  private animateTyping(text: string, pos: number, callback: () => void) {
    if (this.interrupted) {
      return this.stopAnimation();
    }

    if (pos < text.length) {
      this.terminal.write(text.charAt(pos));
      if (text.charAt(pos) === "\n") {
        this.terminal.write("\r");
      }
      this.animationFrameId = requestAnimationFrame(() =>
        this.animateTyping(text, pos + 1, callback)
      );
    } else {
      this.terminal.writeln("\r");
      this.isAnimating = false;
      callback && callback();
    }
  }

  private interruptAnimation() {
    this.stopAnimation();
    this.terminal.write("\r\n\nInterrupted\r\n\n");
    this.writePrompt();
  }
}
