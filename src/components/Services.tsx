import { RevealImageListItem } from "./RevealImageListItem";

const SERVICES = [
  {
    text: "Web Design",
    images: [
      { src: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=800", alt: "Web Design 1" },
      { src: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800", alt: "Web Design 2" },
    ],
  },
  {
    text: "Branding",
    images: [
      { src: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800", alt: "Branding 1" },
      { src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800", alt: "Branding 2" },
    ],
  },
  {
    text: "E-Commerce",
    images: [
      { src: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800", alt: "E-Commerce 1" },
      { src: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=800", alt: "E-Commerce 2" },
    ],
  },
  {
    text: "Motion",
    images: [
      { src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800", alt: "Motion 1" },
      { src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800", alt: "Motion 2" },
    ],
  },
  {
    text: "UI/UX",
    images: [
      { src: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=800", alt: "UI/UX 1" },
      { src: "https://images.unsplash.com/photo-1613909209432-0b0a8eaf2834?q=80&w=800", alt: "UI/UX 2" },
    ],
  },
  {
    text: "Development",
    images: [
      { src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800", alt: "Development 1" },
      { src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800", alt: "Development 2" },
    ],
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32 container mx-auto px-6 text-center">
      <div className="mb-24 md:mb-32">
        <span className="text-brand-purple font-mono text-xs mb-6 block uppercase tracking-[0.5em] font-bold">
          Our Expertise
        </span>
        <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-[0.9]">
          Specialized in <br /> <span className="text-white/20">high-end solutions.</span>
        </h2>
      </div>

      <div className="flex flex-col items-center max-w-5xl mx-auto w-full">
        {SERVICES.map((service, index) => (
          <RevealImageListItem 
            key={index}
            index={index}
            text={service.text}
            images={service.images as any}
          />
        ))}
      </div>
    </section>
  );
}
