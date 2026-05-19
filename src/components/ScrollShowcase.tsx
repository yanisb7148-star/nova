import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SHOWCASE_ITEMS = [
  {
    title: "Cinematic Branding",
    subtitle: "Immersive narrative for luxury brands.",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1920",
  },
  {
    title: "Futuristic UI",
    subtitle: "Precision-engineered digital interfaces.",
    image: "https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?auto=format&fit=crop&q=80&w=1920",
  },
  {
    title: "Abstract Motion",
    subtitle: "Fluid movement that captures attention.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1920",
  },
  {
    title: "Next-Gen Web",
    subtitle: "High-performance creative development.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1920",
  },
];

export function ScrollShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pin = gsap.fromTo(
      sectionRef.current,
      { translateX: 0 },
      {
        translateX: `-${(SHOWCASE_ITEMS.length - 1) * 100}vw`,
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "2000 top",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      }
    );

    return () => {
      pin.kill();
    };
  }, []);

  return (
    <section className="overflow-hidden relative">
      {/* Dynamic Blend Overlays */}
      <div className="absolute top-0 left-0 w-full h-[20vh] bg-gradient-to-b from-brand-navy to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-[20vh] bg-gradient-to-t from-brand-navy to-transparent z-20 pointer-events-none" />

      <div ref={triggerRef}>
        <div 
          ref={sectionRef} 
          className="flex h-screen w-[400vw] relative"
        >
          {SHOWCASE_ITEMS.map((item, index) => (
            <div 
              key={index} 
              className="h-screen w-screen flex flex-col items-center justify-center relative p-12 md:p-24"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover scale-[1.1] opacity-20 grayscale-[0.3] transition-transform duration-[2000ms]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-navy/60" />
              </div>

              {/* Content */}
              <div className="relative z-10 text-left w-full max-w-6xl">
                <motion.div
                   initial={{ opacity: 0, x: -30 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="text-brand-purple font-mono text-[10px] md:text-sm mb-6 block uppercase tracking-[0.5em] font-bold">
                    Case Study 0{index + 1}
                  </span>
                  <h2 className="text-5xl md:text-[8rem] font-black mb-10 leading-[0.8] tracking-tighter uppercase italic">
                    {item.title.split(" ").map((word, i) => (
                      <span key={i} className={i % 2 !== 0 ? "text-white/20" : "text-white"}>
                        {word}{" "}
                      </span>
                    ))}
                  </h2>
                  <p className="text-lg md:text-3xl text-white/40 max-w-2xl font-light leading-relaxed italic border-l border-brand-purple/50 pl-8">
                    {item.subtitle}
                  </p>
                </motion.div>
                
                <div className="mt-16 w-32 h-[1px] bg-gradient-to-r from-brand-purple to-transparent opacity-50" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
