"use client";

export default function Navigation(): React.ReactElement {
  return (
    <nav className="sticky top-0 z-50 bg-slate-800 shadow-lg">
      <div className="mx-auto max-w-2xl px-4 sm:px-8">
        <div className="flex items-center justify-start gap-8 py-4">
          <a
            href="#player"
            className="text-sm font-medium text-white transition-colors hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800"
          >
            Player
          </a>
          <a
            href="#tracks"
            className="text-sm font-medium text-white transition-colors hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800"
          >
            Tracks
          </a>
          <a
            href="#about"
            className="text-sm font-medium text-white transition-colors hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800"
          >
            About
          </a>
        </div>
      </div>
    </nav>
  );
}