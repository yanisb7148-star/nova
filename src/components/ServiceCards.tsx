import { GlowCard } from "./GlowCard";
import { Laptop, ShoppingBag, Palette, Move, Search, Lightbulb } from "lucide-react";

const CARDS = [
  {
    title: "WEBSITE CREATION",
    desc: "Next-gen websites built with modern technologies like React and Next.js.",
    icon: Laptop,
    tools: ["Next.js", "React", "Tailwind", "Vercel"],
    color: "glow-purple"
  },
  {
    title: "SHOPIFY DEVELOPMENT",
    desc: "Premium e-commerce experiences tailored for high-end conversion.",
    icon: ShoppingBag,
    tools: ["Shopify", "Liquid", "Stripe"],
    color: "glow-blue"
  },
  {
    title: "BRAND IDENTITY",
    desc: "Memorable visual languages that define market leaders.",
    icon: Palette,
    tools: ["Figma", "Branding", "UI/UX"],
    color: "glow-purple"
  },
  {
    title: "MOTION DESIGN",
    desc: "Bringing your digital presence to life with immersive 3D and 2D animations.",
    icon: Move,
    tools: ["Three.js", "Framer", "GSAP", "Lenis"],
    color: "glow-blue"
  },
  {
    title: "SEO OPTIMIZATION",
    desc: "Strategic search engine positioning for maximum visibility and impact.",
    icon: Search,
    tools: ["Analytics", "Keywords", "Performance"],
    color: "glow-purple"
  },
  {
    title: "CREATIVE STRATEGY",
    desc: "In-depth market analysis and strategic planning for your digital growth.",
    icon: Lightbulb,
    tools: ["Strategy", "Growth", "Consulting"],
    color: "glow-blue"
  }
];

export function ServiceCards() {
  return (
    <section id="services" className="py-20 md:py-32 container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {CARDS.map((card, i) => (
          <GlowCard key={i} glowClassName={card.color}>
            <div className="flex flex-col gap-5 md:gap-6 h-full p-2 md:p-0">
              <div className={card.color === 'glow-purple' ? 'text-brand-purple' : 'text-brand-blue'}>
                <card.icon size={28} />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-black mb-3 tracking-tight italic uppercase">{card.title}</h3>
                <p className="text-white/50 text-sm md:text-base leading-relaxed font-medium mb-4">
                  {card.desc}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-2">
                  {card.tools.map((tool) => (
                    <span 
                      key={tool} 
                      className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-white/40 uppercase tracking-wider"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-auto pt-4 flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-white/30 group-hover:text-white transition-colors cursor-pointer">
                Learn more <span className="translate-x-0 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </GlowCard>
        ))}
      </div>
    </section>
  );
}
