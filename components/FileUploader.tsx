import React, { useRef, useState } from 'react';

interface FileUploaderProps {
    onFileSelect: (file: File | null) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelect }) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        if (file && !file.name.endsWith(".plist")) {
            alert(".plist形式のファイルのみアップロード可能です。");
            event.target.value = "";
            return;
        }

        setFileName(file ? file.name : null); // ファイル名を更新
        onFileSelect(file); // 親コンポーネントに渡す
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="flex flex-col items-center">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }} // ファイル入力要素を非表示
            />
            <button onClick={handleClick} className="p-2 bg-blue-500 text-white rounded">
                ファイルを選択
            </button>
            {fileName && <p className="mt-2 text-gray-700">選択されたファイル: {fileName}</p>}
        </div>
    );
};

export default FileUploader;
