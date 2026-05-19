import { useScroll, useTransform, motion, MotionValue } from "motion/react";
import React, { useRef, useEffect, useState, useMemo } from "react";

const ParticleBackground = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * -20,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bg-brand-purple rounded-full"
          initial={{ 
            x: `${p.x}%`, 
            y: `${p.y}%`, 
            opacity: 0.2,
            scale: 0.5 
          }}
          animate={{
            y: [`${p.y}%`, `${p.y - 10}%`, `${p.y}%`],
            opacity: [0.2, 0.4, 0.2],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
          style={{
            width: p.size,
            height: p.size,
            filter: "blur(1px)",
          }}
        />
      ))}
    </div>
  );
};

export function WhyNova() {
  return (
    <section className="py-12 md:py-16 relative overflow-hidden">
      <ParticleBackground />
      <ContainerScroll
        titleComponent={
          <div className="flex flex-col items-center">
            <span className="text-brand-purple font-mono text-xs mb-4 block uppercase tracking-[0.3em]">
              The Advantage
            </span>
            <h2 className="text-4xl md:text-7xl font-black mb-8 leading-tight uppercase tracking-tighter italic">
              Unmatched <br /> <span className="text-white/30">Performance.</span>
            </h2>
          </div>
        }
      >
        <div className="h-full w-full bg-brand-navy p-8 md:p-12 flex flex-col justify-center">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { label: "Design Focus", value: "Ultra Modern" },
              { label: "Site Speed", value: "99/100" },
              { label: "Development", value: "Custom Built" },
              { label: "Philosophy", value: "Human Centered" },
              { label: "Support", value: "24/7 Strategic" },
              { label: "Optimization", value: "SEO Gold" }
            ].map((arg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col border-l border-white/10 pl-6 group hover:border-brand-purple transition-colors"
              >
                <span className="text-2xl md:text-4xl font-black mb-1 text-white group-hover:text-brand-purple transition-colors">
                  {arg.value}
                </span>
                <span className="text-white/30 font-mono text-[10px] uppercase tracking-widest">
                  {arg.label}
                </span>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-20 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-end gap-8">
            <p className="text-white/40 text-lg max-w-md font-medium leading-relaxed italic">
              "We don't just build websites; we create digital assets that drive growth and tell your story."
            </p>
            <div className="flex gap-4">
               <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/20 text-xs font-bold italic">N</div>
               <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/20 text-xs font-bold italic">S</div>
            </div>
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.75, 0.9] : [1.1, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [15, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <div
      className="h-[50rem] md:h-[70rem] flex items-center justify-center relative p-4 md:p-20"
      ref={containerRef}
    >
      <div
        className="py-10 md:py-40 w-full relative"
        style={{
          perspective: "1200px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: { translate: MotionValue<number>, titleComponent: any }) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="max-w-7xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-6xl -mt-12 mx-auto h-[35rem] md:h-[45rem] w-full border border-white/10 p-2 md:p-4 bg-white/5 backdrop-blur-xl rounded-[40px] shadow-2xl relative overflow-hidden"
    >
       {/* Background subtle glow inside the card */}
       <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple/10 blur-[80px] rounded-full" />
       
      <div className="h-full w-full overflow-hidden rounded-[30px] bg-brand-navy/50 border border-white/5 md:p-4 relative">
        <ParticleBackground />
        {children}
      </div>
    </motion.div>
  );
};
