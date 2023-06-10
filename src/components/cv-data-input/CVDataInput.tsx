import URLInput from "./URLInput";
import FileUpload from "./FileUpload";
import ValidationMessage from "./ValidationMessage";
interface Props {

}

export default function (){
    const handleUrlChange = (url: string) => {
        // Handle URL change
    };

    const handleFileChange = (file: File | null) => {
        // Handle file change
    };

    return (
        <div>
            <URLInput onUrlChange={handleUrlChange} />
            <FileUpload onFileChange={handleFileChange} />
            <ValidationMessage message="Display ValidationMessage based on your validation logic"/>
        </div>
    );
};