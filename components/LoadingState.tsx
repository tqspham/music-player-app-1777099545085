import { Loader } from "lucide-react";

export default function LoadingState(): React.ReactElement {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <Loader className="h-8 w-8 animate-spin text-blue-600" />
      <p className="text-slate-300">Loading tracks...</p>
    </div>
  );
}