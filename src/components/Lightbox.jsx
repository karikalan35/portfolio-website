import { useEffect } from "react";
import { X } from "lucide-react";

function isVideo(src) {
  return /\.(mp4|webm|ogg|mov)(\?|$)/i.test(src);
}

export default function Lightbox({ src, alt, onClose }) {
  useEffect(() => {
    if (!src) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [src, onClose]);

  if (!src) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      <button
        className="absolute top-5 right-5 text-text-dim hover:text-text-bright transition-colors duration-200 rounded-md p-1.5 cursor-pointer hover:bg-surface focus-visible:text-text-bright"
        onClick={onClose}
        aria-label="Close image"
      >
        <X size={26} />
      </button>

      {isVideo(src) ? (
        <video
          src={src}
          aria-label={alt}
          className="max-w-[92vw] max-h-[86vh] w-auto h-auto object-contain rounded-md shadow-2xl cursor-default"
          controls
          autoPlay
          loop
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <img
          src={src}
          alt={alt}
          className="max-w-[92vw] max-h-[86vh] w-auto h-auto object-contain rounded-md shadow-2xl cursor-default"
          onClick={(e) => e.stopPropagation()}
        />
      )}

      <span className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[0.75rem] text-text-dim">
        Press Esc or click outside to close
      </span>
    </div>
  );
}