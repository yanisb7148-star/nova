import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import React from "react";
import { cn } from "@/src/lib/utils";

interface GlowCardProps {
  children: React.ReactNode;
  glowClassName?: string;
  className?: string;
  key?: any;
}

export function GlowCard({ children, className, glowClassName }: GlowCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn(
        "group relative rounded-[24px] border border-white/5 bg-white/5 backdrop-blur-sm p-8 transition-all duration-300 hover:bg-white/[0.08]",
        glowClassName === "glow-purple" ? "hover:border-brand-purple/50" : "hover:border-brand-blue/50",
        className
      )}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className={cn(
          "pointer-events-none absolute -inset-px rounded-[24px] opacity-0 transition duration-300 group-hover:opacity-100",
          glowClassName === "glow-purple" ? "bg-brand-purple/10" : "bg-brand-blue/10"
        )}
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              ${glowClassName === "glow-purple" ? "rgba(147, 51, 234, 0.15)" : "rgba(59, 130, 246, 0.15)"},
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
