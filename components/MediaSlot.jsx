"use client";

import { useState } from "react";
import { ImageIcon } from "lucide-react";

// Shows your image. If the file isn't added yet, shows a placeholder instead.
export default function MediaSlot({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-steel-100 to-white text-center text-xs font-medium text-navy/50 ${className}`}
      >
        <ImageIcon className="h-6 w-6" />
        <span>{alt}</span>
        <span className="text-[10px] opacity-70">{src}</span>
      </div>
    );
  }

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={className} onError={() => setFailed(true)} />;
}
