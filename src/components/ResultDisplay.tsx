'use client';

import { useState } from 'react';

interface Detection {
  segment_index: number;
  class_id: number;
  class_name: string;
  japanese_name?: string;
  confidence: number;
  color: number[];
  bbox: number[];
}

interface PairDetection {
  ventilation: Detection;
  label: Detection;
  distance: number;
  pair_type: string;
  page_index: number;
}

interface AnalysisResult {
  filename: string;
  image_format: string;
  page_count: number;
  split_count: number;
  images: string[];
  highlighted_images: string[];
  detections: Detection[];
  detection_count: number;
  pairs?: PairDetection[];
  pair_summary?: Record<string, number>;
  total_pairs?: number;
  unpaired_detections?: Record<string, number>;
}

interface ResultDisplayProps {
  result: AnalysisResult | null;
  error: string | null;
  isLoading: boolean;
}

export default function ResultDisplay({ result, error, isLoading }: ResultDisplayProps) {
  const [showDetections, setShowDetections] = useState(false);
  const [showPairs, setShowPairs] = useState(true);

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

  return (
    <div className="mt-8">
      <div className="p-4 bg-green-50 text-green-700 rounded-lg">
        <h3 className="font-semibold text-lg mb-2">アップロード成功！</h3>
        <p><strong>ファイル名:</strong> {result.filename}</p>
        <p><strong>ページ数:</strong> {result.page_count}</p>
        <p><strong>画像フォーマット:</strong> {result.image_format}</p>
        <p><strong>分割数:</strong> {result.split_count}分割</p>
        <p><strong>検出数:</strong> {result.detection_count}</p>
        {result.total_pairs !== undefined && (
          <p><strong>ペア数:</strong> {result.total_pairs}</p>
        )}
      </div>

      {result.detections && result.detections.length > 0 && (
        <div className="mt-5 p-5 bg-blue-50 rounded-lg border-l-4 border-blue-500">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">YOLO 検出結果</h3>
            <button
              onClick={() => setShowDetections(!showDetections)}
              className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 flex items-center gap-2"
            >
              {showDetections ? '検出結果を隠す' : '検出結果を表示'}
            </button>
          </div>
          {showDetections && (
            <div className="mt-4">
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                  <thead className="bg-blue-100">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">クラス</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">信頼度</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">セグメントインデックス</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">境界ボックス</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.detections.map((detection, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-4 py-2 text-sm text-gray-800">{detection.class_name}</td>
                        <td className="px-4 py-2 text-sm text-gray-800">{(detection.confidence * 100).toFixed(1)}%</td>
                        <td className="px-4 py-2 text-sm text-gray-800">{detection.segment_index}</td>
                        <td className="px-4 py-2 text-sm text-gray-800 font-mono">
                          [{detection.bbox.map(v => v.toFixed(1)).join(', ')}]
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {result.pairs && result.pairs.length > 0 && (
        <div className="mt-5 p-5 bg-purple-50 rounded-lg border-l-4 border-purple-500">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">ペアリング結果</h3>
            <button
              onClick={() => setShowPairs(!showPairs)}
              className="px-4 py-2 bg-purple-500 text-white text-sm rounded hover:bg-purple-600 flex items-center gap-2"
            >
              {showPairs ? 'ペア結果を隠す' : 'ペア結果を表示'}
            </button>
          </div>
          {showPairs && (
            <div className="mt-4">
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                  <thead className="bg-purple-100">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">ページ</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">換気種別</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">ラベル</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">距離 (px)</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">ペアタイプ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.pairs.map((pair, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-4 py-2 text-sm text-gray-800">{pair.page_index + 1}</td>
                        <td className="px-4 py-2 text-sm text-gray-800">
                          {pair.ventilation.japanese_name || pair.ventilation.class_name}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-800">
                          {pair.label.japanese_name || pair.label.class_name}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-800">{pair.distance.toFixed(1)}</td>
                        <td className="px-4 py-2 text-sm text-gray-800 font-mono">{pair.pair_type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {result.highlighted_images && result.highlighted_images.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">検出結果ハイライト画像</h3>
          <div className="grid grid-cols-1 gap-5">
            {result.highlighted_images.map((image, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow">
                <h4 className="font-medium mb-2 text-gray-800">ページ {index + 1}</h4>
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