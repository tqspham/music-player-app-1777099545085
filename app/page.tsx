"use client";

import { useEffect, useRef, useState } from "react";
import Player from "@/components/Player";
import TrackInfo from "@/components/TrackInfo";
import ProgressBar from "@/components/ProgressBar";
import VolumeControl from "@/components/VolumeControl";
import TrackList from "@/components/TrackList";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import EmptyState from "@/components/EmptyState";

interface Track {
  id: string;
  name: string;
  artist: string;
  duration: number;
  url: string;
}

interface ApiResponse {
  tracks: Track[];
  error?: string;
}

export default function Home(): React.ReactElement {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);

  // Fetch tracks on mount
  useEffect(() => {
    const fetchTracks = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/tracks");
        const data: ApiResponse = await response.json();

        if (!response.ok || data.error) {
          throw new Error(data.error || "Failed to fetch tracks");
        }

        setTracks(data.tracks);
        setError(null);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error occurred";
        setError(errorMessage);
        setTracks([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTracks();
  }, []);

  // Update audio element when current track changes
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.src = currentTrack.url;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          // Handle autoplay errors silently
        });
      }
    }
  }, [currentTrack, isPlaying]);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Handle audio time updates
  const handleTimeUpdate = (): void => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // Handle audio duration loaded
  const handleLoadedMetadata = (): void => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  // Handle track end
  const handleTrackEnd = (): void => {
    handleNext();
  };

  // Play
  const handlePlay = (): void => {
    if (audioRef.current && currentTrack) {
      audioRef.current.play().catch(() => {
        // Handle play errors silently
      });
      setIsPlaying(true);
    }
  };

  // Pause
  const handlePause = (): void => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
  };

  // Next track
  const handleNext = (): void => {
    if (tracks.length === 0) return;

    if (currentTrack === null) {
      setCurrentTrack(tracks[0]);
      setCurrentTime(0);
      setIsPlaying(true);
      return;
    }

    const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % tracks.length;
    setCurrentTrack(tracks[nextIndex]);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  // Previous track
  const handlePrevious = (): void => {
    if (tracks.length === 0) return;

    if (currentTrack === null) {
      setCurrentTrack(tracks[tracks.length - 1]);
      setCurrentTime(0);
      setIsPlaying(true);
      return;
    }

    const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id);
    const prevIndex = currentIndex === 0 ? tracks.length - 1 : currentIndex - 1;
    setCurrentTrack(tracks[prevIndex]);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  // Seek
  const handleSeek = (time: number): void => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  // Select track from list
  const handleSelectTrack = (track: Track): void => {
    setCurrentTrack(track);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  // Handle volume change
  const handleVolumeChange = (vol: number): void => {
    setVolume(vol);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      // Only handle if no input is focused
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.contentEditable === "true"
      ) {
        return;
      }

      switch (e.key) {
        case " ":
          e.preventDefault();
          if (isPlaying) {
            handlePause();
          } else if (currentTrack) {
            handlePlay();
          }
          break;
        case "ArrowRight":
          e.preventDefault();
          handleNext();
          break;
        case "ArrowLeft":
          e.preventDefault();
          handlePrevious();
          break;
        case "ArrowUp":
          e.preventDefault();
          handleVolumeChange(Math.min(1, volume + 0.1));
          break;
        case "ArrowDown":
          e.preventDefault();
          handleVolumeChange(Math.max(0, volume - 0.1));
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, currentTrack, volume]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 sm:p-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-center text-4xl font-bold text-white">
          Music Player
        </h1>

        <div className="space-y-8">
          {/* Player Section */}
          <div className="rounded-lg bg-slate-800 p-6 shadow-xl">
            {isLoading ? (
              <LoadingState />
            ) : error ? (
              <ErrorState error={error} />
            ) : currentTrack ? (
              <>
                <TrackInfo
                  track={currentTrack}
                  currentTime={currentTime}
                  duration={duration}
                />
                <div className="my-6">
                  <ProgressBar
                    currentTime={currentTime}
                    duration={duration}
                    onSeek={handleSeek}
                  />
                </div>
                <Player
                  currentTrack={currentTrack}
                  isPlaying={isPlaying}
                  onPlay={handlePlay}
                  onPause={handlePause}
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                />
                <div className="mt-6">
                  <VolumeControl
                    volume={volume}
                    onVolumeChange={handleVolumeChange}
                  />
                </div>
              </>
            ) : (
              <EmptyState />
            )}
          </div>

          {/* Track List */}
          {!isLoading && !error && (
            <div className="rounded-lg bg-slate-800 p-6 shadow-xl">
              <h2 className="mb-4 text-xl font-semibold text-white">
                Available Tracks
              </h2>
              <TrackList
                tracks={tracks}
                onSelectTrack={handleSelectTrack}
                currentTrackId={currentTrack?.id ?? null}
                isLoading={isLoading}
                error={error}
              />
            </div>
          )}
        </div>
      </div>

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleTrackEnd}
        crossOrigin="anonymous"
      />
    </main>
  );
}