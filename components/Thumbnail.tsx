"use client";

interface ThumbnailProps {
  src: string | null;
  alt: string;
  title: string;
}

export default function Thumbnail({
  src,
  alt,
  title,
}: ThumbnailProps): React.ReactElement {
  return (
    <div className="mb-6 flex justify-center">
      {src ? (
        <div className="rounded-lg shadow-lg">
          <img
            src={src}
            alt={alt}
            width={200}
            height={200}
            className="rounded-lg object-cover"
          />
        </div>
      ) : (
        <div className="flex h-[200px] w-[200px] items-center justify-center rounded-lg bg-slate-700 shadow-lg">
          <p className="text-center text-sm text-slate-400">{title}</p>
        </div>
      )}
    </div>
  );
}