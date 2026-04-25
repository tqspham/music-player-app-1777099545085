"use client";

import { useRef } from "react";

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

export default function ProgressBar({
  currentTime,
  duration,
  onSeek,
}: ProgressBarProps): React.ReactElement {
  const progressRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!progressRef.current || !duration) return;

    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = percentage * duration;

    onSeek(newTime);
  };

  const percentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={progressRef}
      onClick={handleClick}
      className="group relative h-2 w-full cursor-pointer rounded-full bg-slate-700 transition-all hover:h-3"
      role="slider"
      aria-label="Track progress"
      aria-valuemin={0}
      aria-valuemax={Math.floor(duration)}
      aria-valuenow={Math.floor(currentTime)}
      tabIndex={0}
    >
      <div
        className="h-full rounded-full bg-blue-600 transition-all"
        style={{ width: `${percentage}%` }}
      />
      <div
        className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-white shadow-lg opacity-0 transition-opacity group-hover:opacity-100"
        style={{ left: `${percentage}%`, transform: "translate(-50%, -50%)" }}
        aria-hidden="true"
      />
    </div>
  );
}