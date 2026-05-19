import { motion } from "motion/react";
import { Instagram, Linkedin, Twitter, MessageCircle, Mail, Phone, ExternalLink } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-16 md:py-24 relative overflow-hidden">
      {/* Massive Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-purple/20 blur-[180px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <span className="text-brand-purple font-mono text-sm mb-6 block uppercase tracking-[0.3em]">
            Ready to start?
          </span>
          <h2 className="text-6xl md:text-9xl font-black mb-8 leading-[0.8] tracking-tighter">
            Every project <br /> is <span className="text-white/30">unique.</span>
          </h2>
          <p className="text-2xl md:text-4xl font-medium text-white/50 mb-10 italic">
            "Let’s build something exceptional together."
          </p>

          {/* Social Icons */}
          <div className="flex flex-wrap justify-center gap-8 mb-16">
            {[
              { icon: Instagram, href: "#" },
              { icon: Linkedin, href: "#" },
              { icon: Twitter, href: "#" },
              { icon: MessageCircle, href: "#", text: "WhatsApp" },
              { icon: Mail, href: "mailto:hello@novastudio.com", text: "Email" },
            ].map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                whileHover={{ scale: 1.1, y: -5 }}
                className="group flex flex-col items-center gap-4"
              >
                <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center group-hover:bg-brand-purple group-hover:text-black transition-all">
                  <item.icon size={24} />
                </div>
                {item.text && (
                  <span className="text-xs font-mono uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                    {item.text}
                  </span>
                )}
              </motion.a>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-2xl mx-auto">
            <div className="p-8 glass rounded-3xl group cursor-pointer hover:bg-white/10 transition-colors">
              <Mail className="text-brand-purple mb-4" />
              <h4 className="text-xl font-bold mb-2">hello@novastudio.com</h4>
              <p className="text-white/40 text-sm">Send us an inquiry anytime.</p>
            </div>
            <div className="p-8 glass rounded-3xl group cursor-pointer hover:bg-white/10 transition-colors">
              <Phone className="text-brand-blue mb-4" />
              <h4 className="text-xl font-bold mb-2">+1 (555) 0123 4567</h4>
              <p className="text-white/40 text-sm">Mon - Fri, 9am - 6pm EST.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
