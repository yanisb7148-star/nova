import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import React, { useRef } from "react";
import { Calendar, Video, ArrowRight, Sparkles } from "lucide-react";

export function Booking() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Magnetic Button Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const translateButtonX = useTransform(springX, (val) => val * 0.15);
  const translateButtonY = useTransform(springY, (val) => val * 0.15);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section className="py-32 relative overflow-hidden bg-brand-navy">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-purple/20 blur-[150px] rounded-full animate-pulse" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="glass rounded-[3rem] p-12 md:p-24 text-center border-white/10 relative overflow-hidden group"
           onMouseMove={handleMouseMove}
           onMouseLeave={handleMouseLeave}
        >
          {/* Animated Particles Simulation */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                animate={{
                  x: [Math.random() * 800, Math.random() * 800],
                  y: [Math.random() * 400, Math.random() * 400],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <motion.span 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              className="text-brand-purple font-mono text-xs uppercase tracking-[0.4em] mb-8 block"
            >
              Consultation
            </motion.span>
            
            <h2 className="text-4xl md:text-7xl font-black mb-8 leading-[0.85] tracking-tighter uppercase italic">
              Let’s talk <br /> <span className="text-white/30">about your project.</span>
            </h2>
            
            <p className="text-white/50 text-xl md:text-2xl font-medium mb-16 max-w-2xl mx-auto italic">
              "Book a free discovery call and let’s build something exceptional together."
            </p>

            <div className="flex flex-col items-center gap-8" ref={containerRef}>
              <motion.a
                href="https://calendar.google.com" // Placeholder for booking link
                target="_blank"
                rel="noreferrer"
                style={{
                  x: translateButtonX,
                  y: translateButtonY,
                }}
                className="relative group/btn"
              >
                {/* Glowing border animation */}
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-purple to-brand-blue rounded-full blur-md opacity-40 group-hover/btn:opacity-100 transition duration-500 animate-pulse" />
                
                <button className="relative px-12 py-6 bg-white text-black font-black text-lg uppercase tracking-widest rounded-full flex items-center gap-4 transition-transform active:scale-95 shadow-2xl">
                  <Calendar size={24} />
                  Book a Call
                  <ArrowRight size={20} className="transition-transform group-hover/btn:translate-x-2" />
                </button>
              </motion.a>

              <div className="flex gap-8 items-center text-white/40 font-bold text-xs uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <Video size={14} className="text-brand-blue" />
                  <span>Schedule a Visio</span>
                </div>
                <div className="w-[1px] h-4 bg-white/10" />
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-brand-purple" />
                  <span>Free Consultation</span>
                </div>
              </div>

              <div className="mt-8 flex flex-col items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 glass rounded-full">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">
                    Usually responds within 24h
                  </span>
                </div>
                
                <div className="h-12 w-[1px] bg-gradient-to-b from-white/20 to-transparent" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
