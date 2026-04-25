"use client";

interface Track {
  id: string;
  name: string;
  artist: string;
  duration: number;
  url: string;
}

interface TrackListProps {
  tracks: Track[];
  onSelectTrack: (track: Track) => void;
  currentTrackId: string | null;
  isLoading: boolean;
  error: string | null;
}

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

export default function TrackList({
  tracks,
  onSelectTrack,
  currentTrackId,
  isLoading,
  error,
}: TrackListProps): React.ReactElement {
  if (isLoading) {
    return <div className="text-slate-400">Loading tracks...</div>;
  }

  if (error) {
    return (
      <div className="text-red-400">
        Error loading tracks: {error}
      </div>
    );
  }

  if (tracks.length === 0) {
    return <div className="text-slate-400">No tracks available</div>;
  }

  return (
    <div className="space-y-2">
      {tracks.map((track) => (
        <button
          key={track.id}
          onClick={() => onSelectTrack(track)}
          className={`w-full rounded-lg p-4 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 ${
            currentTrackId === track.id
              ? "bg-blue-600 text-white"
              : "bg-slate-700 text-slate-100 hover:bg-slate-600"
          }`}
          type="button"
          aria-label={`Play ${track.name} by ${track.artist}, ${formatDuration(track.duration)}`}
          aria-pressed={currentTrackId === track.id}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">{track.name}</p>
              <p className="text-sm opacity-75">{track.artist}</p>
            </div>
            <span className="text-sm opacity-75">
              {formatDuration(track.duration)}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}