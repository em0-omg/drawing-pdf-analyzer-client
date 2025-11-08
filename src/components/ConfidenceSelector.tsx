'use client';

interface ConfidenceSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ConfidenceSelector({ value, onChange }: ConfidenceSelectorProps) {
  return (
    <div className="flex items-center justify-center gap-3 my-4">
      <label htmlFor="confidence" className="text-sm font-medium text-gray-700">
        信頼度閾値:
      </label>
      <select
        id="confidence"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 bg-white"
      >
        <option value="0.1">0.1 (低)</option>
        <option value="0.25">0.25 (標準)</option>
        <option value="0.5">0.5 (中)</option>
        <option value="0.75">0.75 (高)</option>
        <option value="0.9">0.9 (最高)</option>
      </select>
    </div>
  );
}
