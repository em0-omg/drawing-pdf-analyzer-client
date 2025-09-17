'use client';

import { useState } from 'react';
import PDFUpload from '@/components/PDFUpload';
import APIEndpointSelector from '@/components/APIEndpointSelector';
import SplitCountSelector from '@/components/SplitCountSelector';
import ResultDisplay from '@/components/ResultDisplay';
import { uploadPDF, AnalysisResult } from '@/services/api';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [apiEndpoint, setApiEndpoint] = useState('analyze_pdf');
  const [splitCount, setSplitCount] = useState('4');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('PDFファイルを選択してください。');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const analysisResult = await uploadPDF(selectedFile, apiEndpoint, splitCount);
      setResult(analysisResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : '不明なエラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            PDF Analyzer Demo
          </h1>

          <APIEndpointSelector value={apiEndpoint} onChange={setApiEndpoint} />
          <SplitCountSelector value={splitCount} onChange={setSplitCount} />
          <PDFUpload onFileSelect={setSelectedFile} disabled={isLoading} />

          <div className="text-center mt-6">
            <button
              onClick={handleUpload}
              disabled={!selectedFile || isLoading}
              className={`px-8 py-3 rounded-lg font-medium text-white ${
                !selectedFile || isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {isLoading ? 'アップロード中...' : 'アップロード'}
            </button>
          </div>

          <ResultDisplay
            result={result}
            error={error}
            isLoading={isLoading}
            splitCount={splitCount}
          />
        </div>
      </div>
    </div>
  );
}
