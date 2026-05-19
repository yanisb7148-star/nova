import React from "react";
import { cn } from "@/src/lib/utils";
import { motion } from "motion/react";

interface ShowImageListItemProps {
  text: string;
  images: Array<{ src: string; alt: string }>;
  index: number;
  key?: any;
}

export function RevealImageListItem({ text, images, index }: ShowImageListItemProps) {
  const isEven = index % 2 === 0;

  return (
    <motion.div 
      initial="initial"
      whileHover="hover"
      className="group relative w-full flex justify-center py-5 cursor-pointer border-b border-white/5 hover:bg-white/[0.01] transition-colors"
    >
      <div className="relative inline-block">
        <h1 className="text-3xl md:text-5xl font-black text-white/50 transition-all duration-700 group-hover:text-white tracking-tighter uppercase italic py-2 whitespace-nowrap">
          {text}
        </h1>
        
        {/* Tight Staggered Images (Quinconce) at the end of the word */}
        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 flex items-center pointer-events-none">
          {/* Image 1: Unique Stagger */}
          <motion.div
            variants={{
              initial: { opacity: 0, scale: 0.4, x: -20, y: 0, rotate: -15 },
              hover: { opacity: 1, scale: 1, x: 0, y: isEven ? -40 : 40, rotate: isEven ? -10 : 10 }
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "absolute z-20 w-12 h-16 md:w-20 md:h-28 rounded-lg overflow-hidden glass border-white/20 shadow-2xl"
            )}
          >
            <img 
              alt={images[0].alt} 
              src={images[0].src} 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* Image 2: Counter Stagger */}
          <motion.div
            variants={{
              initial: { opacity: 0, scale: 0.4, x: -20, y: 0, rotate: 15 },
              hover: { opacity: 1, scale: 1, x: 25, y: isEven ? 40 : -40, rotate: isEven ? 8 : -8 }
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            className={cn(
              "absolute z-10 w-16 h-12 md:w-28 md:h-20 rounded-lg overflow-hidden glass border-white/20 shadow-2xl"
            )}
          >
            <img 
              alt={images[1].alt} 
              src={images[1].src} 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
