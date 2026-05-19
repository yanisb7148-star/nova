import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { InteractiveBallpit } from "./InteractiveBallpit";
import { useRef } from "react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[120vh] flex flex-col items-center justify-center overflow-hidden pt-24 px-10 text-center"
    >
      {/* Interactive 3D Ballpit Background */}
      <InteractiveBallpit className="opacity-40 lg:opacity-60" />

      {/* Background Orbs */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-brand-purple/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-brand-blue/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-purple/5 blur-[150px]" />
      
      {/* Smooth Transition Overlay with Blur */}
      <div className="absolute bottom-0 left-0 w-full h-[40vh] bg-gradient-to-t from-brand-navy via-brand-navy/80 to-transparent z-[5] backdrop-blur-[2px]" />

      <motion.div 
        className="relative z-10 container mx-auto md:-mt-32"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-block px-4 py-1.5 mb-8 border border-white/10 bg-white/5 rounded-full"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60">
            Redefining Digital Craft
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="text-6xl md:text-[140px] leading-[0.9] md:leading-[0.8] mb-10 tracking-tighter uppercase"
        >
          <span className="font-black text-white">Nova</span> <br className="md:hidden" />
          <span className="font-stylish italic normal-case text-white/90">Studio</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-white/60 max-w-xl mx-auto mb-12 font-light leading-relaxed"
        >
          We craft premium digital experiences. Modern websites, immersive branding and high-end digital products for the next generation of brands.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button className="px-10 py-5 btn-gradient rounded-full font-bold text-sm tracking-widest uppercase transition-all hover:scale-105 active:scale-95">
            Explore Work
          </button>
          <button className="group flex items-center gap-3 px-10 py-5 border border-white/20 hover:border-white/40 rounded-full font-bold text-sm tracking-widest uppercase transition-all hover:scale-105 active:scale-95">
            Our Services
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
