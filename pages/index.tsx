import FileUploader from "@/components/FileUploader";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">iOS辞書 → Google日本語入力変換</h1>
      <FileUploader />
    </div>
  );
}
