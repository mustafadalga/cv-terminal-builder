import type { XtermOptions, CVConfig } from "@/types";

export default function generateJSTemplate(
  terminalSettings: XtermOptions,
  cvInteraction: CVConfig
) {
  return String.raw`
  const addonsConfig = [
    { instance: FitAddon, autoFit: true },
    { instance: WebLinksAddon },
  ];

  const terminalSettings = ${JSON.stringify(terminalSettings, null, 2)};

  const cvInteraction = ${JSON.stringify(cvInteraction, null, 2)};

  const terminalConfigurations = {
    terminal: terminalSettings,
    cv: cvInteraction,
    addons: addonsConfig,
    container: document.querySelector("#terminal"),
    };
  `;
}
