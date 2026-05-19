import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/src/lib/utils";

const NAV_LINKS = [
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Process", href: "#process" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500",
      scrolled ? "top-4 w-[92%] md:w-[85%] max-w-4xl" : "top-8 w-[95%] md:w-[90%] max-w-5xl"
    )}>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={cn(
          "rounded-full px-6 py-3 flex items-center justify-between transition-all duration-500",
          scrolled ? "glass border-white/20 shadow-2xl py-2" : "bg-transparent backdrop-blur-none border-transparent"
        )}
      >
        <a href="/" className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-brand-purple" />
          <span className="font-bold tracking-tighter text-lg uppercase">Nova Studio</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-8 text-[11px] font-medium uppercase tracking-[0.2em] opacity-60">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:opacity-100 transition-opacity"
              >
                {link.name}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="px-5 py-2 bg-white text-black rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-brand-purple hover:text-white transition-all"
          >
            Start a Project
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.div>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-16 left-0 w-full glass rounded-3xl p-8 md:hidden flex flex-col gap-6"
        >
          {NAV_LINKS.filter(link => ["Projects", "Contact"].includes(link.name)).map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-bold uppercase tracking-widest text-white/60"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="w-full py-4 rounded-xl bg-white text-black text-center text-xs font-bold uppercase tracking-widest hover:bg-brand-purple hover:text-white transition-all"
            onClick={() => setIsOpen(false)}
          >
            Start a Project
          </a>
        </motion.div>
      )}
    </nav>
  );
}
