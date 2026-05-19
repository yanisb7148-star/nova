export function Footer() {
  return (
    <footer className="z-50 px-10 py-10 border-t border-white/5 bg-brand-navy">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-widest text-white/40">
        <div className="flex flex-col gap-2 items-center md:items-start">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-brand-purple" />
            <span className="font-bold tracking-tighter text-sm uppercase text-white">Nova Studio</span>
          </div>
          <div>Nova Studio &copy; 2026</div>
        </div>

        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-opacity">Instagram</a>
          <a href="#" className="hover:text-white transition-opacity">Behance</a>
          <a href="#" className="hover:text-white transition-opacity">LinkedIn</a>
        </div>

        <div className="hidden md:block">
          Made with Love in London
        </div>
      </div>
    </footer>
  );
}
