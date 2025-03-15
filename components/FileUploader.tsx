import { useState } from "react";
import PlistConverter from "@/components/PlistConverter";

export default function FileUploader() {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    const handleUpload = () => {
        if (!file) {
            alert("ファイルを選択してください");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target?.result) {
                const text = e.target.result.toString();
                console.log("ファイルの内容:", text);
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className="flex flex-col items-center">
            <input type="file" accept=".plist" onChange={handleFileChange} />
            <button
                className="mt-2 p-2 bg-blue-500 text-white rounded"
                onClick={handleUpload}
            >
                変換
            </button>
        </div>
    );
}
