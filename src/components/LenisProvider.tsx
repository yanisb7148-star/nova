import Lenis from "lenis";
import React, { createContext, useContext, useEffect, useRef } from "react";

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

export const LenisProvider = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Handle scroll events for any other components
    lenis.on('scroll', () => {
      // Trigger update for Framer Motion scroll values
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });
    
    resizeObserver.observe(document.body);

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
};
