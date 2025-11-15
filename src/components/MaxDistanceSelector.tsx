'use client';

interface MaxDistanceSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function MaxDistanceSelector({ value, onChange }: MaxDistanceSelectorProps) {
  return (
    <div className="flex items-center justify-center gap-3 my-4">
      <label htmlFor="maxDistance" className="text-sm font-medium text-gray-700">
        ペアリング最大距離:
      </label>
      <select
        id="maxDistance"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-gray-900 bg-white"
      >
        <option value="100">100px (近)</option>
        <option value="150">150px</option>
        <option value="200">200px</option>
        <option value="250">250px (標準)</option>
        <option value="300">300px</option>
        <option value="400">400px</option>
        <option value="500">500px (遠)</option>
      </select>
    </div>
  );
}
