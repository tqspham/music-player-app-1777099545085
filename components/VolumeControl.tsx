"use client";

import { Volume2 } from "lucide-react";

interface VolumeControlProps {
  volume: number;
  onVolumeChange: (volume: number) => void;
}

export default function VolumeControl({
  volume,
  onVolumeChange,
}: VolumeControlProps): React.ReactElement {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onVolumeChange(parseFloat(e.target.value));
  };

  const volumePercentage = Math.round(volume * 100);

  return (
    <div className="flex items-center gap-3">
      <Volume2 className="h-5 w-5 text-slate-400" aria-hidden="true" />
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleChange}
        className="h-2 flex-1 cursor-pointer rounded-lg bg-slate-700 accent-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800"
        aria-label={`Volume control, ${volumePercentage}% (Up/Down Arrow)`}
      />
      <span className="w-8 text-right text-sm text-slate-300">
        {volumePercentage}%
      </span>
    </div>
  );
}