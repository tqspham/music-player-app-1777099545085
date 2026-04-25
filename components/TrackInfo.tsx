"use client";

interface Track {
  id: string;
  name: string;
  artist: string;
  duration: number;
  url: string;
}

interface TrackInfoProps {
  track: Track | null;
  currentTime: number;
  duration: number;
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

export default function TrackInfo({
  track,
  currentTime,
  duration,
}: TrackInfoProps): React.ReactElement {
  if (!track) {
    return (
      <div className="text-center">
        <p className="text-lg text-slate-400">No track selected</p>
      </div>
    );
  }

  return (
    <div className="mb-6 text-center">
      <h2 className="text-2xl font-bold text-white">{track.name}</h2>
      <p className="mt-2 text-slate-300">{track.artist}</p>
      <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-400">
        <span aria-label="Current playback time">{formatTime(currentTime)}</span>
        <span>/</span>
        <span aria-label="Total track duration">{formatTime(duration)}</span>
      </div>
    </div>
  );
}