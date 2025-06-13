import FileUploader from "@/components/FileUploader";
import FileList from "@/components/FileList";

export default function Home() {
  return (
    <main className="min-h-screen p-4">
      <h1 className="text-2xl font-bold text-center">🗂️ File Sharing App</h1>
      <FileUploader />
      <FileList />
    </main>
  );
}
