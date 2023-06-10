import { useState } from "react"
import PromptInput from "./PromptInput";
import DefaultPrompt from "./DefaultPrompt";

export default function  ()  {
    const defaultPrompt = "root > ";
    const [customPrompt, setCustomPrompt] = useState(defaultPrompt);

    const handlePromptChange = (prompt: string) => {
        setCustomPrompt(prompt);
    };

    return (
        <div>
            <PromptInput onPromptChange={handlePromptChange} defaultValue={defaultPrompt} />
            <DefaultPrompt defaultPrompt={customPrompt} />
        </div>
    )
};
