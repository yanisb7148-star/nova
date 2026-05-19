import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";

const STEPS = [
  {
    num: "01",
    title: "Discovery",
    desc: "We dive deep into your brand, audience, and goals to build a strategic foundation that informs every subsequent decision.",
    tags: ["Market Analysis", "User Research", "Brand Audit"]
  },
  {
    num: "02",
    title: "Strategy",
    desc: "Defining the unique positioning and conceptual framework that will differentiate your brand in a crowded digital landscape.",
    tags: ["Positioning", "UX Strategy", "Narrative"]
  },
  {
    num: "03",
    title: "Design",
    desc: "Crafting a distinctive visual identity and immersive user experiences that resonate emotionally with your target audience.",
    tags: ["Identity", "UI Design", "3D/Motion"]
  },
  {
    num: "04",
    title: "Development",
    desc: "Bringing the vision to life with clean, high-performance code, buttery smooth animations, and robust architecture.",
    tags: ["Next.js", "Creative Dev", "Performance"]
  },
  {
    num: "05",
    title: "Launch",
    desc: "Ensuring a flawless transition to the market followed by ongoing strategic optimization to drive sustainable growth.",
    tags: ["Deployment", "SEO", "Growth"]
  }
];

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="process" ref={containerRef} className="py-16 md:py-24 container mx-auto px-6 relative">
      <div className="flex flex-col md:flex-row gap-20">
        {/* Sticky Header */}
        <div className="md:sticky md:top-40 h-fit md:w-1/3 z-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-purple font-mono text-sm mb-4 block uppercase tracking-[0.3em]">
              Methodology
            </span>
            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-[0.9] uppercase tracking-tighter italic">
              Our creative <br /> <span className="text-white/30">Process.</span>
            </h2>
            <p className="text-white/40 text-xl font-medium leading-relaxed max-w-sm">
              A systematic approach to creating distinctive, high-end digital experiences.
            </p>
          </motion.div>
        </div>

        {/* Parallax Steps */}
        <div className="md:w-2/3 relative">
          {/* Vertical Progress Line */}
          <div className="absolute left-0 md:left-[-40px] top-4 bottom-4 w-[1px] bg-white/5">
            <motion.div 
              style={{ scaleY }}
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-brand-purple to-brand-blue origin-top shadow-[0_0_15px_rgba(147,51,234,0.5)]" 
            />
          </div>

        <div className="flex flex-col gap-16 md:gap-24">
            {STEPS.map((step, i) => (
              <ProcessStep key={i} step={step} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessStep({ step }: { step: typeof STEPS[0]; key?: any }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, scale }}
      className="relative pl-10 md:pl-0"
    >
      <motion.div style={{ y }} className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <span className="text-5xl md:text-7xl font-black text-white/5 leading-none">
            {step.num}
          </span>
          <div className="h-[1px] flex-1 bg-white/10" />
        </div>

        <div className="max-w-xl">
          <h3 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tighter italic">
            {step.title}
          </h3>
          <p className="text-white/50 text-base md:text-xl font-medium leading-relaxed mb-8">
            {step.desc}
          </p>
          
          <div className="flex flex-wrap gap-3">
            {step.tags.map(tag => (
              <span key={tag} className="px-4 py-1.5 glass rounded-full text-[10px] uppercase tracking-widest font-bold text-brand-purple">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
