import { useState } from "react";
import { parseString } from "xml2js";
import { convertToGoogleDictionary } from "@/utils/convertToGoogleDictionary";
import DownloadButton from "@/components/DownloadButton";

export default function PlistConverter({ file }: { file: File | null }) {
    const [gdicText, setGdicText] = useState<string>("");

    const handleConvert = async () => {
        if (!file) {
            alert("ファイルを選択してください");
            return;
        }

        const reader = new FileReader();
        reader.onload = async (e) => {
            if (e.target?.result) {
                const xmlText = e.target.result.toString();

                parseString(xmlText, { explicitArray: false }, (err, result) => {
                    if (err) {
                        console.error("Plistの解析に失敗しました", err);
                        alert("Plistの解析に失敗しました");
                        return;
                    }

                    console.log("変換されたJSONデータ:", result);
                    const gdicData = convertToGoogleDictionary(result);
                    setGdicText(gdicData);
                });
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className="flex flex-col items-center mt-4">
            <button
                className="p-2 bg-green-500 text-white rounded"
                onClick={handleConvert}
            >
                Google日本語入力形式に変換
            </button>

            {gdicText && (
                <div className="mt-4">
                    <pre className="mt-4 p-2 bg-gray-100 text-black rounded text-sm w-full max-w-md overflow-auto">
                        {gdicText}
                    </pre>
                    <DownloadButton gdicText={gdicText} />
                </div>
            )}
        </div>
    );
}
