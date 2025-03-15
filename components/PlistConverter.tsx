import { useState } from "react";
import { parseString } from "xml2js";

export default function PlistConverter({ file }: { file: File | null }) {
    const [jsonData, setJsonData] = useState<any>(null);

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
                    setJsonData(result.plist.array.dict);
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
                JSONに変換
            </button>

            {jsonData && (
                <pre className="mt-4 p-2 bg-gray-100 rounded text-sm w-full max-w-md overflow-auto">
                    {JSON.stringify(jsonData, null, 2)}
                </pre>
            )}
        </div>
    );
}
