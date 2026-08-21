import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const ref = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let raf = null;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    const handleMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        if (ref.current) {
          ref.current.style.setProperty("--x", `${x}px`);
          ref.current.style.setProperty("--y", `${y}px`);
        }
        raf = null;
      });
    };

    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}