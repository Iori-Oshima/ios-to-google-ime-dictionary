export default function DownloadButton({ gdicText }: { gdicText: string }) {
    const handleDownload = () => {
        // ✅ UTF-8 (BOM付き) のエンコーディングで保存
        const bom = new Uint8Array([0xEF, 0xBB, 0xBF]); // UTF-8 BOM
        const blob = new Blob([bom, gdicText.replace(/\n/g, "\r\n")], { type: "text/plain;charset=utf-8" });

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "converted_gdic.txt";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <button
            className="mt-2 p-2 bg-blue-500 text-white rounded"
            onClick={handleDownload}
            disabled={!gdicText}
        >
            .txtファイルをダウンロード
        </button>
    );
}
