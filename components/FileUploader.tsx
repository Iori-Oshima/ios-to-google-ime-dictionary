import { useState } from "react";
import PlistConverter from "@/components/PlistConverter";

export default function FileUploader() {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <input type="file" accept=".plist" onChange={handleFileChange} />
            {file && (
                <div className="mt-4">
                    <PlistConverter file={file} />
                </div>
            )}
        </div>
    );
}
