'use client';

import { useState } from 'react';

interface PDFUploadProps {
  onFileSelect: (file: File | null) => void;
  disabled?: boolean;
}

export default function PDFUpload({ onFileSelect, disabled }: PDFUploadProps) {
  const [fileName, setFileName] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf') {
        setFileName(file.name);
        onFileSelect(file);
      } else {
        alert('PDFファイルのみアップロード可能です。');
        onFileSelect(null);
        setFileName('');
      }
    }
  };

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center bg-gray-50">
      <p className="text-gray-600 mb-4">PDFファイルを選択してアップロード</p>
      <input
        type="file"
        id="pdfFile"
        accept=".pdf"
        onChange={handleFileChange}
        disabled={disabled}
        className="hidden"
      />
      <label
        htmlFor="pdfFile"
        className={`inline-block px-4 py-2 rounded-lg font-medium cursor-pointer ${
          disabled
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        ファイルを選択
      </label>
      {fileName && (
        <p className="mt-4 text-sm text-gray-600">選択されたファイル: {fileName}</p>
      )}
    </div>
  );
}