"use client";
import { useEffect, useState } from "react";

type FileItem = {
  fileId: string;
  fileName: string;
  fileType: string;
  createdAt: string;
};

export default function FileList() {
  const [files, setFiles] = useState<FileItem[]>([]);

  useEffect(() => {
    fetch("https://swfbeg13yc.execute-api.eu-north-1.amazonaws.com/files")
      .then((res) => res.json())
      .then(setFiles);
  }, []);

  return (
    <div className="p-4 max-w-md mx-auto mt-8">
      <h2 className="text-xl font-bold mb-2">Uploaded Files</h2>
      {files.length === 0 ? (
        <p className="text-gray-500">No files found.</p>
      ) : (
        <ul className="space-y-2">
          {files.map((f) => (
            <li key={f.fileId} className="border p-2 rounded">
              <strong>{f.fileName}</strong> <br />
              <span className="text-sm text-gray-500">{f.fileType}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
