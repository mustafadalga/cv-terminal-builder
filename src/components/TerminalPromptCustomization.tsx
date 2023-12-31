import { useState } from "react";
import { useStore } from "@/store";
import { TextField } from "@mui/material";

export default function TerminalPromptCustomization() {
  const defaultPrompt: string = useStore((state) => state.terminal.prompt);
  const [prompt, setPrompt] = useState<string>(defaultPrompt);

  const handleInput = (prompt: string) => {
    setPrompt(prompt);
    useStore.getState().setPromptName(prompt);
  };

  return (
    <TextField
      label="Prompt"
      variant="standard"
      size="medium"
      fullWidth
      defaultValue={prompt}
      onChange={(e) => handleInput(e.target.value)}
    />
  );
}
