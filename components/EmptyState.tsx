import { Music } from "lucide-react";

export default function EmptyState(): React.ReactElement {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <Music className="h-8 w-8 text-slate-500" />
      <p className="text-slate-400">No tracks available. Please select a track to start playing.</p>
    </div>
  );
}