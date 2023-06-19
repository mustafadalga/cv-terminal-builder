import { CloudUpload } from "@mui/icons-material";
import { Button } from "@mui/material";
import { validateCV } from "@/composables";
import { useStore } from "@/store";
interface Props {
  setValidationMessage: (message: string) => void;
}

export default function ({ setValidationMessage }: Props) {
  const setJsonCV = useStore((state) => state.setJsonCV);
  const createCommands = useStore((state) => state.createCommands);

  const resetStore = () => {
    setJsonCV({});
    createCommands([]);
  };


  const handleFile = (event: Event) => {
    resetStore();
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0] || null;

    if (!file) {
      return setValidationMessage("Invalid JSON CV");
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const cv = JSON.parse(e.target?.result as string);
        const isValid = validateCV(cv);
        if (isValid) {
          setValidationMessage("");
          setJsonCV(cv);
          createCommands(Object.keys(cv));
        } else {
          setValidationMessage("Invalid JSON CV");
        }
      } catch (error) {
        setValidationMessage("Error parsing JSON");
      }
    };
    reader.readAsText(file);
  };

  return (
    <Button
      size="small"
      variant="outlined"
      component="label"
      style={{ gap: 6 }}
      fullWidth
    >
      <CloudUpload style={{ fontSize: 18 }} />
      Upload CV JSON file
      <input type="file" hidden onChange={handleFile} accept=".json" />
    </Button>
  );
}
