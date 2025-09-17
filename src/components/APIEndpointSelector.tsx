'use client';

interface APIEndpointSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function APIEndpointSelector({ value, onChange }: APIEndpointSelectorProps) {
  return (
    <div className="flex items-center justify-center gap-3 my-4">
      <label htmlFor="apiEndpoint" className="text-sm font-medium text-gray-700">
        APIを選択:
      </label>
      <select
        id="apiEndpoint"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 bg-white"
      >
        <option value="analyze_pdf">テキスト検出 (PF100/PF150)</option>
        <option value="find_symbols">記号検出 (target1-4)</option>
      </select>
    </div>
  );
}