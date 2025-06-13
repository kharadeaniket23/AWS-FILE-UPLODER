"use client";
import { useState } from "react";

export default function FileUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");

  const handleUpload = async () => {
    if (!file) return;

    setStatus("Uploading...");

    // Step 1: Get presigned upload URL
    const res = await fetch("https://swfbeg13yc.execute-api.eu-north-1.amazonaws.com/generate-upload-url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileName: file.name, fileType: file.type }),
    });

    const { uploadUrl, fileId, s3Url } = await res.json();

    // Step 2: Upload to S3
    await fetch(uploadUrl, {
      method: "PUT",
      headers: { "Content-Type": file.type },
      body: file,
    });

    // Step 3: Save metadata
    await fetch("https://swfbeg13yc.execute-api.eu-north-1.amazonaws.com/save-metadata", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileId, fileName: file.name, fileType: file.type }),
    });

    setStatus("✅ Uploaded successfully!");
    setFile(null);
  };

  return (
    <div className="p-4 border rounded shadow w-full max-w-md mx-auto mt-6">
      <h2 className="text-xl font-bold mb-2">Upload File</h2>
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
        onClick={handleUpload}
        disabled={!file}
      >
        Upload
      </button>
      <p className="mt-2 text-sm text-gray-600">{status}</p>
    </div>
  );
}
