interface Props {
  css: string;
  js: string;
  link: string;
}

export default function generateHTMLTemplate(props: Props): string {
  return String.raw`
<!--
CV Terminal Builder v1.0.0
(c) 2023 [Mustafa Dalga]
[https://github.com/mustafadalga]

This project is a unique CV Terminal Builder that allows users to create dynamic, interactive CVs in a terminal-like interface.
It was built using React.js, Typescript and the xterm.js library.

Released under the GPL-3 License.
-->
<!DOCTYPE html>
<html lang="en">
    <head>
    <title>CV Terminal - Portfolio</title>
    <!-- Meta tags -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Welcome to My portfolio and CV presented in an innovative terminal UI. Explore my skills, experience, and projects.">
    <!-- Stylesheets -->
    <link rel="stylesheet" href="https://unpkg.com/xterm@5.2.1/css/xterm.css">
    <link href="${props.link}" rel="stylesheet">
    <style>
        *,
        *::before,
        *::after {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        }

        #terminal {
        height: 100%;
        }

        #terminal .xterm-screen {
        height: 100% !important;
        max-width: 100%;
        overflow-y: auto;
        }

        #terminal .xterm-viewport {
        background-color: transparent !important;
        }

        /* Generated Dynamic CSS Code */
        ${props.css}
    </style>
    <!-- JavaScript Libraries -->
    <script src="https://unpkg.com/xterm@5.2.1/lib/xterm.js"></script>
    <script src="https://unpkg.com/xterm-addon-fit@0.7.0/lib/xterm-addon-fit.js"></script>
    <script src="https://unpkg.com/xterm-addon-web-links@0.8.0/lib/xterm-addon-web-links.js"></script>
    </head>
    <body>
    <!-- Terminal UI -->
    <div id="terminal"></div>

    <script>
        // CV Terminal Class - Start
        class CVTerminal {
        terminal;
        isAnimating;
        command;
        addons;
        addonsConfig;
        prompt;
        promptLength;
        cursorX;
        printingFullCV;
        interrupted;
        commands;
        cvSections;
        cv;
        currentSectionIndex;
        animationFrameId;

        constructor(config) {
            this.config = config;
            this.initializeProperties();
            this.installAddons();
            this.openTerminal(this.config.container);
            this.fitTerminal();
            this.registerEvents();
            this.writeWelcomeMessage();
        }

        fitTerminal() {
            const fitAddon = this.addons["FitAddon"];
            fitAddon && fitAddon.fit();
        }

        openTerminal(container) {
            this.terminal.open(container);
            this.terminal.focus();
        }

        writeWelcomeMessage() {
            this.terminal.writeln("Welcome to My CV!");
            this.terminal.writeln("Type 'help' to see available commands.");
            this.writePrompt();
        }

        initializeProperties() {
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

        installAddons() {
            this.addons = {};
            for (const addon of this.addonsConfig) {
            const addonConstructor = Object.values(addon.instance)[0];
            const addonInstance = new addonConstructor();
            this.addons[addon.instance.name] = addonInstance;
            this.terminal.loadAddon(addonInstance);
            if (addon.autoFit) {
                addonInstance.fit();
            }
            }
        }

        registerEvents() {
            this.terminal.onKey((event) => this.handleKeyEvent(event));
            window.addEventListener("resize", () => this.fitTerminal());

            document.addEventListener("click", (event) => {
            const isTerminalClick = event.composedPath().some((el) => el === this.terminal.element);
            if (isTerminalClick) {
                this.terminal.focus();
            } else if (!isTerminalClick) {
                this.terminal.blur();
            }
            });
        }

        handleKeyEvent({ key, domEvent }) {
            const isCtrlC = domEvent.ctrlKey && domEvent.key.toLowerCase() === "c";
            const isPrintable = !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey;

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

        stopAnimation() {
            this.interrupted = false;
            this.isAnimating = false;
            cancelAnimationFrame(this.animationFrameId);
            this.resetFullCV();
        }

        handleBackspace() {
            if (this.cursorX > this.promptLength) {
            this.terminal.write("\b \b");
            this.cursorX--;
            }
        }

        handleReturn() {
            this.terminal.writeln("");
            this.handleCommand();
            this.command = "";
            this.cursorX = this.promptLength;
            if (!this.isAnimating) {
            this.writePrompt();
            }
        }

        handleInput(key) {
            this.terminal.write(key);
            this.command += key;
            this.cursorX++;
        }

        writePrompt() {
            this.terminal.write(this.prompt);
        }

        handleCommand() {
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
            this.terminal.writeln("💡  Command not recognized: " + trimmedCommand + "!");
            this.terminal.writeln("Type 'help' to see available commands.");
            }
        }

        writeHelp() {
            let helpText = "\n  AVAILABLE COMMANDS:\n\n";
            for (const cmd of this.commands) {
            helpText += "- " + cmd + "\n";
            }

            this.isAnimating = true;
            this.animateTyping(helpText, 0, () => {
            this.isAnimating = false;
            this.writePrompt();
            });
        }

        startFullCV() {
            this.printingFullCV = true;
            this.handleFullCVCommand();
        }

        writeSection(sectionName) {
            const section = "\n  " + sectionName.toUpperCase();
            this.terminal.writeln(section);
            const commandInfo = "\r\n" + this.cv[sectionName].join('\n');

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

        handleFullCVCommand() {
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

        resetFullCV() {
            this.currentSectionIndex = 0;
            this.printingFullCV = false;
        }

        animateTyping(text, pos, callback) {
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

        interruptAnimation() {
            this.stopAnimation();
            this.terminal.write("\r\n\nInterrupted\r\n\n");
            this.writePrompt();
        }
    }

// Initialize the terminal 
window.onload = () => {
     ${props.js}
    new CVTerminal(terminalConfigurations);
}
    </script>
    </body>
</html>
  `;
}
