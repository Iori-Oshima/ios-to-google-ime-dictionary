import React, { useRef } from 'react';

interface FileUploaderProps {
    onFileSelect: (file: File) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelect }) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onFileSelect(file);
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }} // ファイル入力要素を非表示にする
            />
            <button onClick={handleClick} className="p-2 bg-blue-500 text-white rounded">
                ファイルを選択
            </button>
        </div>
    );
};

export default FileUploader;
