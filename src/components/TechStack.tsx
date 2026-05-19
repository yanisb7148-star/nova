import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";
import { 
  Zap, 
  Cpu, 
  Layers, 
  Layout, 
  Code2, 
  Globe, 
  Figma, 
  Github, 
  Database, 
  Box, 
  Infinity as InfinityIcon, 
  Sparkles,
  Command
} from "lucide-react";

const TECH_ITEMS = [
  { name: "Next.js", icon: Code2, color: "#ffffff" },
  { name: "React", icon: Cpu, color: "#00F2FF" },
  { name: "Tailwind", icon: Layout, color: "#00D1FF" },
  { name: "Framer", icon: Zap, color: "#9333EA" },
  { name: "GSAP", icon: Sparkles, color: "#C1FF00" },
  { name: "Shopify", icon: Globe, color: "#2DF07D" },
  { name: "WordPress", icon: Layers, color: "#00A0FF" },
  { name: "Figma", icon: Figma, color: "#FF4B2B" },
  { name: "Vercel", icon: Globe, color: "#ffffff" },
  { name: "Stripe", icon: Command, color: "#7B61FF" },
  { name: "Claude", icon: Box, color: "#FF8C66" },
  { name: "ChatGPT", icon: Box, color: "#19C37D" },
  { name: "GitHub", icon: Github, color: "#ffffff" },
  { name: "Supabase", icon: Database, color: "#3ECF8E" },
  { name: "Three.js", icon: Box, color: "#ffffff" },
  { name: "Lenis", icon: InfinityIcon, color: "#FF3333" },
  { name: "Motion", icon: Zap, color: "#E933FF" },
  { name: "Shadcn", icon: Layout, color: "#ffffff" },
];

const MarqueeRow = ({ items, direction = 1, speed = 35 }: { items: typeof TECH_ITEMS, direction?: 1 | -1, speed?: number }) => {
  return (
    <div className="flex overflow-hidden select-none relative py-6">
      <motion.div
        initial={{ x: direction === 1 ? "0%" : "-50%" }}
        animate={{
          x: direction === 1 ? "-50%" : "0%",
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex flex-nowrap items-center gap-6 pr-6 w-max"
      >
        {/* Repeating items for seamless loop */}
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <TechCard key={i} item={item} />
        ))}
      </motion.div>
    </div>
  );
};

function TechCard({ item }: { item: typeof TECH_ITEMS[0], key?: any }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -8 }}
      className={cn(
        "flex items-center gap-4 md:gap-5 px-6 py-4 md:px-10 md:py-6 glass border-white/5 rounded-2xl transition-all duration-500 cursor-pointer group relative overflow-hidden shrink-0 min-w-[170px] md:min-w-[220px]",
        "hover:border-brand-purple/50 hover:shadow-[0_0_60px_rgba(147,51,234,0.3)] bg-white/[0.03]"
      )}
    >
      {/* Dynamic Background Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/20 via-transparent to-brand-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div 
        className="p-2 md:p-3 rounded-xl bg-white/[0.07] border border-white/10 group-hover:bg-brand-purple/20 transition-all duration-500 z-10 group-hover:rotate-12"
        style={{ 
          boxShadow: `0 0 20px ${item.color}30`,
          borderColor: `${item.color}40`
        }}
      >
        <item.icon 
          size={20} 
          className="md:w-[26px] md:h-[26px] transition-all duration-500" 
          style={{ 
            color: item.color,
            filter: `drop-shadow(0 0 8px ${item.color})`
          }} 
        />
      </div>
      
      <span 
        className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] transition-all duration-500 relative z-10 whitespace-nowrap"
        style={{ 
          color: item.color,
          textShadow: `0 0 10px ${item.color}40`
        }}
      >
        {item.name}
      </span>

      {/* Glossy Line Effect */}
      <div className="absolute left-[-100%] top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_2s_infinite]" />
    </motion.div>
  );
}

export function TechStack() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <section className="pt-16 pb-8 md:pt-24 md:pb-12 relative overflow-hidden bg-[#0d0d12]">
      {/* High-End Technical Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d12] via-transparent to-[#0d0d12]" />
      
      {/* Animated Glitchy Glows */}
      <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-brand-purple/10 blur-[160px] rounded-full pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 -right-1/4 w-[800px] h-[800px] bg-brand-blue/10 blur-[160px] rounded-full pointer-events-none animate-pulse" />

      <div className="container mx-auto px-6 mb-12 md:mb-24 relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="max-w-4xl mx-auto"
        >
          <span className="text-white font-mono text-[10px] mb-8 block uppercase tracking-[0.6em] font-black">
            [ My Creative Stack v2.0 ]
          </span>
          <h2 className="text-4xl md:text-7xl font-black mb-8 md:mb-10 uppercase tracking-tighter italic leading-[0.9] md:leading-[0.8] text-white/90">
            Engineered with <br /> <span className="text-white">Precision.</span>
          </h2>
          <p className="hidden md:block text-white/40 text-xl md:text-2xl font-medium leading-relaxed max-w-2xl mx-auto italic border-l-2 border-brand-purple/30 pl-8">
            "Harnessing the most advanced creative frameworks and premium architectures to build the next generation of digital legacies."
          </p>
        </motion.div>
      </div>

      <div className="relative">
        {/* Cinematic Edge Fades */}
        <div className="absolute inset-y-0 left-0 w-20 md:w-80 bg-gradient-to-r from-[#0d0d12] via-[#0d0d12]/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 md:w-80 bg-gradient-to-l from-[#0d0d12] via-[#0d0d12]/90 to-transparent z-10 pointer-events-none" />

        {/* Laser Lines */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-purple/50 to-transparent blur-[1px]" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-blue/50 to-transparent blur-[1px]" />

        <div className="flex flex-col gap-4 md:gap-6">
          <MarqueeRow items={TECH_ITEMS.slice(0, 9)} direction={1} speed={isMobile ? 25 : 40} />
          <MarqueeRow items={TECH_ITEMS.slice(9)} direction={-1} speed={isMobile ? 30 : 45} />
        </div>
      </div>
      
      {/* Bottom Scanline Effect */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0d0d12] to-transparent pointer-events-none" />
    </section>
  );
}
