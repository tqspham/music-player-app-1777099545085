"use client";

import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

interface Track {
  id: string;
  name: string;
  artist: string;
  duration: number;
  url: string;
}

interface PlayerProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function Player({
  currentTrack,
  isPlaying,
  onPlay,
  onPause,
  onNext,
  onPrevious,
}: PlayerProps): React.ReactElement {
  const handlePlayPauseClick = (): void => {
    if (isPlaying) {
      onPause();
    } else if (currentTrack) {
      onPlay();
    }
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <button
        onClick={onPrevious}
        className="rounded-full bg-slate-700 p-3 text-white transition-colors hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800"
        aria-label="Previous track (Left Arrow)"
        type="button"
      >
        <SkipBack className="h-5 w-5" />
      </button>

      <button
        onClick={handlePlayPauseClick}
        disabled={!currentTrack}
        className="rounded-full bg-blue-600 p-4 text-white transition-colors hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800"
        aria-label={isPlaying ? "Pause (Spacebar)" : "Play (Spacebar)"}
        type="button"
      >
        {isPlaying ? (
          <Pause className="h-6 w-6" />
        ) : (
          <Play className="h-6 w-6" />
        )}
      </button>

      <button
        onClick={onNext}
        className="rounded-full bg-slate-700 p-3 text-white transition-colors hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800"
        aria-label="Next track (Right Arrow)"
        type="button"
      >
        <SkipForward className="h-5 w-5" />
      </button>
    </div>
  );
}