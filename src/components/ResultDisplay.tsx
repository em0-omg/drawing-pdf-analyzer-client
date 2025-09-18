'use client';

import { useState } from 'react';

interface AnalysisResult {
  filename: string;
  page_count: number;
  image_format: string;
  images?: string[];
  highlighted_images?: string[];
  analysis?: any;
  symbol_count?: number;
  total_matches?: number;
  matches_by_symbol?: any;
}

interface ResultDisplayProps {
  result: AnalysisResult | null;
  error: string | null;
  isLoading: boolean;
  splitCount: string;
}

export default function ResultDisplay({ result, error, isLoading, splitCount }: ResultDisplayProps) {
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showMatches, setShowMatches] = useState(false);

  if (isLoading) {
    return (
      <div className="mt-8 p-5 bg-gray-100 rounded-lg flex items-center gap-3">
        <div className="w-6 h-6 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-gray-600">処理中です…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 p-4 bg-red-50 text-red-700 rounded-lg">
        エラー: {error}
      </div>
    );
  }

  if (!result) {
    return null;
  }

  const escapeHtml = (str: string) =>
    str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

  return (
    <div className="mt-8">
      <div className="p-4 bg-green-50 text-green-700 rounded-lg">
        <h3 className="font-semibold text-lg mb-2">アップロード成功！</h3>
        <p><strong>ファイル名:</strong> {result.filename}</p>
        <p><strong>ページ数:</strong> {result.page_count}</p>
        <p><strong>画像フォーマット:</strong> {result.image_format}</p>
        <p><strong>分割数:</strong> {splitCount}分割</p>
      </div>

      {result.analysis && (
        <div className="mt-5 p-5 bg-gray-50 rounded-lg border-l-4 border-green-500">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">Gemini AI 解析結果</h3>
            <button
              onClick={() => setShowAnalysis(!showAnalysis)}
              className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 flex items-center gap-2"
            >
              {showAnalysis ? '解析結果を隠す' : '解析結果を表示'}
            </button>
          </div>
          {showAnalysis && (
            <pre className="mt-4 whitespace-pre-wrap text-sm text-gray-700 leading-relaxed">
              {escapeHtml(JSON.stringify(result.analysis, null, 2))}
            </pre>
          )}
        </div>
      )}

      {result.symbol_count !== undefined && result.total_matches !== undefined && (
        <div className="mt-5 p-5 bg-blue-50 rounded-lg border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold mb-3">記号検出結果</h3>
          <p><strong>検出対象記号数:</strong> {result.symbol_count}</p>
          <p><strong>総検出数:</strong> {result.total_matches}</p>
          <div className="flex justify-between items-center mt-3">
            <h4 className="font-semibold">記号別検出詳細</h4>
            <button
              onClick={() => setShowMatches(!showMatches)}
              className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 flex items-center gap-2"
            >
              {showMatches ? '詳細を隠す' : '詳細を表示'}
            </button>
          </div>
          {showMatches && (
            <pre className="mt-4 whitespace-pre-wrap text-sm text-gray-700 leading-relaxed">
              {escapeHtml(JSON.stringify(result.matches_by_symbol, null, 2))}
            </pre>
          )}
        </div>
      )}

      {result.highlighted_images && result.highlighted_images.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">検出結果ハイライト（結合済み）</h3>
          <div className="grid grid-cols-1 gap-5">
            {result.highlighted_images.map((image, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow">
                <h4 className="font-medium mb-2 text-gray-800">ページ {index + 1} ハイライト画像</h4>
                <img
                  src={`data:image/${result.image_format};base64,${image}`}
                  alt={`ページ ${index + 1} ハイライト画像`}
                  className="w-full border border-gray-200 rounded"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}