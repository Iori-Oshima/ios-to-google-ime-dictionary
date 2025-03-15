export default function DownloadButton({ gdicText }: { gdicText: string }) {
    const handleDownload = () => {
        const blob = new Blob([gdicText], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "converted_gdic.txt"; // ダウンロードファイル名
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
