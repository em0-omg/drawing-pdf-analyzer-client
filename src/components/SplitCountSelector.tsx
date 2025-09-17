'use client';

interface SplitCountSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SplitCountSelector({ value, onChange }: SplitCountSelectorProps) {
  return (
    <div className="flex items-center justify-center gap-3 my-5">
      <label htmlFor="splitCount" className="text-sm font-medium text-gray-700">
        分割数を選択:
      </label>
      <select
        id="splitCount"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 bg-white"
      >
        <option value="2">2分割</option>
        <option value="4">4分割</option>
        <option value="8">8分割</option>
        <option value="16">16分割</option>
      </select>
    </div>
  );
}