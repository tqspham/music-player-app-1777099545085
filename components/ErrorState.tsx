import { AlertCircle } from "lucide-react";

interface ErrorStateProps {
  error: string;
}

export default function ErrorState({
  error,
}: ErrorStateProps): React.ReactElement {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg bg-red-500/10 p-6 py-12">
      <AlertCircle className="h-8 w-8 text-red-400" />
      <p className="text-center text-red-300">
        Failed to load tracks: {error}
      </p>
    </div>
  );
}