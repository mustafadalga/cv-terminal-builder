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
  <!-- Custom JavaScript -->
      class CVTerminal {
        constructor (config) {
            this.config = config;
            this.initializeProperties();
            this.installAddons();
            this.openTerminal(config.container);
            this.fitTerminal();
            this.registerEvents();
            this.writeWelcomeMessage();
        }
    
        initializeProperties () {
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
    
        fitTerminal () {
            const fitAddon = this.addons["FitAddon"];
            fitAddon?.fit();
        }
    
        openTerminal (container) {
            this.terminal.open(container);
            this.terminal.focus();
        }
    
        registerEvents () {
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
    
        handleKeyEvent({key,domEvent }) {
            const isCtrlC = domEvent.ctrlKey && domEvent.key === "c";
            const isPrintable =
                !domEvent.altKey &&
                !domEvent.altGraphKey &&
                !domEvent.ctrlKey &&
                !domEvent.metaKey;
    
            if (this.isAnimating && isCtrlC) {
                return this.interruptAnimation();
            }
            if (this.isAnimating) return;
    
            switch (domEvent.keyCode) {
                case 8:
                    this.handleBackspace();
                    break;
                case 13:
                    this.handleReturn();
                    break;
                default:
                    if (isPrintable) {
                        this.handleInput(key);
                    }
            }
        }
    
        interruptAnimation () {
            this.interrupted = true;
            this.isAnimating = false;
            this.terminal.writeln("\nInterrupted");
            this.writePrompt();
        }
    
        handleBackspace () {
            if (this.cursorX > this.promptLength) {
                this.terminal.write("\b \b");
                this.cursorX--; // Decrement the counter
            }
        }
    
        handleReturn () {
            this.terminal.writeln("");
            this.handleCommand();
            this.command = "";
            this.cursorX = this.promptLength;
            if (!this.isAnimating) {
                this.writePrompt();
            }
        }
    
        handleInput (key) {
            this.terminal.write(key);
            this.command += key;
            this.cursorX++; // Increment the counter
        }
    
        writeWelcomeMessage () {
            this.terminal.writeln("Welcome to My CV!");
            this.terminal.writeln("Type 'help' to see available commands.");
            this.writePrompt();
        }
    
        writePrompt () {
            this.terminal.write(this.prompt);
        }
    
        handleCommand () {
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
                this.terminal.writeln("💡  Command not recognized: "+trimmedCommand+"!");
                this.terminal.writeln("Type 'help' to see available commands.");
            }
        }
    
        writeHelp () {
            let helpText = "\n  AVAILABLE COMMANDS:\n\n";
            for (const cmd of this.commands) {
                helpText += "- "+cmd+"\n";
            }
    
            this.isAnimating = true;
            this.animateTyping(helpText, 0, () => {
                this.isAnimating = false;
                this.writePrompt();
            });
        }
    
        startFullCV () {
            this.printingFullCV = true;
            this.handleFullCVCommand();
        }
    
        writeSection (sectionName) {
            const section = "\n  "+sectionName.toUpperCase();
            this.terminal.writeln(section);
            const commandInfo = "\r\n"+this.cv[sectionName].join('\n');
    
            this.isAnimating = true;
            this.animateTyping(commandInfo, 0, () => {
                this.isAnimating = false;
                if (this.printingFullCV) {
                    // Check the flag to see whether we're printing the full CV.
                    this.handleFullCVCommand();
                } else {
                    this.writePrompt();
                }
            });
        }
    
        handleFullCVCommand () {
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
    
        resetFullCV () {
            this.currentSectionIndex = 0;
            this.printingFullCV = false;
        }
    
        animateTyping (text, pos, callback) {
            if (this.interrupted) {
                this.interrupted = false;
                this.isAnimating = false;
                callback && callback();
                return;
            }
    
            if (pos < text.length) {
                this.terminal.write(text.charAt(pos));
                if (text.charAt(pos) === "\n") {
                    this.terminal.write("\r");
                }
                requestAnimationFrame(() => this.animateTyping(text, pos + 1, callback));
            } else {
                this.terminal.writeln("\r");
                this.isAnimating = false;
                callback && callback();
            }
        }
    }
    
      window.onload = function() {
        ${props.js}
        // initialize terminal.
        new CVTerminal(terminalConfigurations);
      }

  </script>
  </body>
  </html>
    `;
}
