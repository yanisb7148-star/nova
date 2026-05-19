import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { cn } from "@/src/lib/utils";

// MediaItemType defines the structure of a media item
interface MediaItemType {
    id: number;
    type: string;
    title: string;
    desc: string;
    url: string;
    span: string;
}

// MediaItem component renders either a video or image based on item.type
const MediaItem = ({ item, className, onClick }: { item: MediaItemType, className?: string, onClick?: () => void }) => {
    const videoRef = useRef<HTMLVideoElement>(null); 
    const [isInView, setIsInView] = useState(false); 
    const [isBuffering, setIsBuffering] = useState(true); 

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                setIsInView(entry.isIntersecting); 
            });
        }, options);

        if (videoRef.current) {
            observer.observe(videoRef.current); 
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current); 
            }
        };
    }, []);

    useEffect(() => {
        let mounted = true;

        const handleVideoPlay = async () => {
            if (!videoRef.current || !isInView || !mounted) return;

            try {
                if (videoRef.current.readyState >= 3) {
                    setIsBuffering(false);
                    await videoRef.current.play(); 
                } else {
                    setIsBuffering(true);
                    await new Promise((resolve) => {
                        if (videoRef.current) {
                            videoRef.current.oncanplay = resolve; 
                        }
                    });
                    if (mounted) {
                        setIsBuffering(false);
                        await videoRef.current.play();
                    }
                }
            } catch (error) {
                console.warn("Video playback failed:", error);
            }
        };

        if (isInView) {
            handleVideoPlay();
        } else if (videoRef.current) {
            videoRef.current.pause();
        }

        return () => {
            mounted = false;
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.removeAttribute('src');
                videoRef.current.load();
            }
        };
    }, [isInView]);

    if (item.type === 'video') {
        return (
            <div className={cn(className, "relative overflow-hidden")}>
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    onClick={onClick}
                    playsInline
                    muted
                    loop
                    preload="auto"
                    style={{
                        opacity: isBuffering ? 0.8 : 1,
                        transition: 'opacity 0.2s',
                        transform: 'translateZ(0)',
                        willChange: 'transform',
                    }}
                >
                    <source src={item.url} type="video/mp4" />
                </video>
                {isBuffering && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                )}
            </div>
        );
    }

    return (
        <img
            src={item.url} 
            alt={item.title} 
            className={cn(className, "object-cover cursor-pointer")} 
            onClick={onClick} 
            loading="lazy" 
            decoding="async"
            referrerPolicy="no-referrer"
        />
    );
};

// GalleryModal component displays the selected media item in a modal
interface GalleryModalProps {
    selectedItem: MediaItemType;
    isOpen: boolean;
    onClose: () => void;
    setSelectedItem: (item: MediaItemType | null) => void;
    mediaItems: MediaItemType[]; 
}

const GalleryModal = ({ selectedItem, isOpen, onClose, setSelectedItem, mediaItems }: GalleryModalProps) => {
    const [dockPosition, setDockPosition] = useState({ x: 0, y: 0 });  

    if (!isOpen) return null; 

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-brand-navy/95 backdrop-blur-2xl"
              onClick={onClose}
            />

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-6xl aspect-video glass rounded-[2rem] overflow-hidden shadow-2xl z-20"
            >
                <div className="h-full flex flex-col">
                    <div className="flex-1 relative flex items-center justify-center bg-black/40">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedItem.id}
                                className="relative w-full h-full flex items-center justify-center"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4 }}
                            >
                                <MediaItem item={selectedItem} className="w-full h-full object-contain" onClick={onClose} />
                                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                                    <h3 className="text-white text-3xl font-black uppercase tracking-tighter">
                                        {selectedItem.title}
                                    </h3>
                                    <p className="text-white/60 text-lg mt-2 font-medium">
                                        {selectedItem.desc}
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                <motion.button
                    className="absolute top-6 right-6 p-3 rounded-full glass text-white hover:bg-white/20 transition-all z-30"
                    onClick={onClose}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <X size={24} />
                </motion.button>
            </motion.div>

            {/* Draggable Dock */}
            <motion.div
                drag
                dragMomentum={false}
                dragElastic={0.1}
                initial={{ y: 100 }}
                animate={{ y: 0, x: dockPosition.x }}
                onDragEnd={(_, info) => {
                    setDockPosition(prev => ({
                        x: prev.x + info.offset.x,
                        y: prev.y + info.offset.y
                    }));
                }}
                className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[110] touch-none"
            >
                <motion.div
                    className="relative rounded-2xl glass p-3 border border-white/20 shadow-2xl cursor-grab active:cursor-grabbing"
                >
                    <div className="flex items-center -space-x-4 px-2">
                        {mediaItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedItem(item);
                                }}
                                style={{
                                    zIndex: selectedItem.id === item.id ? 30 : mediaItems.length - index,
                                }}
                                className={cn(
                                    "relative w-12 h-12 md:w-16 md:h-16 flex-shrink-0 rounded-xl overflow-hidden cursor-pointer transition-all border-2",
                                    selectedItem.id === item.id ? "border-brand-purple z-10" : "border-transparent opacity-60 hover:opacity-100"
                                )}
                                animate={{
                                    scale: selectedItem.id === item.id ? 1.2 : 1,
                                    y: selectedItem.id === item.id ? -10 : 0,
                                }}
                                whileHover={{
                                    scale: 1.3,
                                    y: -15,
                                    zIndex: 40
                                }}
                            >
                                <MediaItem item={item} className="w-full h-full" onClick={() => setSelectedItem(item)} />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export function ProjectShowcase() {
    const [selectedItem, setSelectedItem] = useState<MediaItemType | null>(null);
    const [items, setItems] = useState<MediaItemType[]>([
        {
            id: 1,
            type: 'image',
            title: 'Aura Luxury',
            desc: 'Premium high-end branding and web experience for global elite.',
            url: 'https://images.unsplash.com/photo-1600607687940-4e524cb35097?q=80&w=1200',
            tags: ['Branding', 'Web Design'],
            span: 'md:col-span-2 md:row-span-4'
        },
        {
            id: 2,
            type: 'image',
            title: 'Vortex Tech',
            desc: 'Futuristic product interface for cutting-edge technologies.',
            url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200',
            tags: ['UI/UX', 'Product'],
            span: 'md:col-span-1 md:row-span-2'
        },
        {
            id: 3,
            type: 'image',
            title: 'Nova Streetwear',
            desc: 'Streetwear brand identity that breaks visual boundaries.',
            url: 'https://images.unsplash.com/photo-1552061332-ca0dbada46a1?q=80&w=1200',
            tags: ['Identity', 'Motion'],
            span: 'md:col-span-1 md:row-span-4'
        },
        {
            id: 4,
            type: 'image',
            title: 'Lumiere Fashion',
            desc: 'Minimalist editorial design for luxury fashion house.',
            url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200',
            tags: ['Editorial', 'Luxury'],
            span: 'md:col-span-1 md:row-span-2'
        },
        {
            id: 5,
            type: 'image',
            title: 'Echo Music',
            desc: 'Immersive auditory and visual experience platform.',
            url: 'https://images.unsplash.com/photo-1514525253361-bee8a1874a13?q=80&w=1200',
            tags: ['Experience', 'Interactive'],
            span: 'md:col-span-2 md:row-span-2'
        },
        {
            id: 6,
            type: 'image',
            title: 'Zen Restaurant',
            desc: 'Cultural and sensory branding for high-end dining.',
            url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200',
            tags: ['Branding', 'Gastronomy'],
            span: 'md:col-span-1 md:row-span-2'
        }
    ]);
    const [isDragging, setIsDragging] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const handleScroll = () => {
        if (!scrollRef.current) return;
        const scrollWidth = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
        const scrollLeft = scrollRef.current.scrollLeft;
        const index = Math.round((scrollLeft / scrollWidth) * (items.length - 1));
        setActiveIndex(index);
    };

    return (
        <section id="projects" className="py-24 md:py-32 container mx-auto px-6 max-w-7xl">
            <div className="mb-16 md:mb-24 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <span className="text-white font-mono text-[10px] mb-2 block uppercase tracking-[0.6em] font-black opacity-60">
                    [ Selected Projects ]
                  </span>
                  <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter">
                    Selected <span className="text-white/30">Works.</span>
                  </h2>
                </motion.div>
            </div>

            <AnimatePresence mode="wait">
                {selectedItem && (
                    <GalleryModal
                        selectedItem={selectedItem}
                        isOpen={true}
                        onClose={() => setSelectedItem(null)}
                        setSelectedItem={setSelectedItem}
                        mediaItems={items}
                    />
                )}
            </AnimatePresence>

            {/* Mobile Carousel / Desktop Grid */}
            {isMobile ? (
                <div className="relative">
                    <div 
                        ref={scrollRef}
                        onScroll={handleScroll}
                        className="flex overflow-x-auto gap-4 scrollbar-hide pb-12 snap-x snap-mandatory px-4 -mx-4"
                    >
                        {items.map((item) => (
                            <motion.div
                                key={item.id}
                                className="w-[82vw] shrink-0 snap-center relative aspect-[3/4] rounded-[2rem] overflow-hidden glass border-white/5"
                                onClick={() => setSelectedItem(item)}
                                whileTap={{ scale: 0.98 }}
                            >
                                <MediaItem
                                    item={item}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-10 flex flex-col justify-end">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {/* @ts-ignore */}
                                        {item.tags?.map((tag: string) => (
                                            <span key={tag} className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[8px] font-black uppercase tracking-wider text-white">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h3 className="text-white text-3xl font-black uppercase tracking-tight italic leading-none">{item.title}</h3>
                                    <p className="text-white/40 text-[10px] font-bold tracking-widest uppercase mt-3 flex items-center gap-2">
                                        View Case Study <span className="text-brand-purple">→</span>
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    
                    {/* Pagination Dots */}
                    <div className="flex justify-center gap-2 mt-4">
                        {items.map((_, i) => (
                            <div 
                                key={i}
                                className={cn(
                                    "h-1.5 transition-all duration-300 rounded-full",
                                    activeIndex === i ? "w-8 bg-brand-purple" : "w-1.5 bg-white/20"
                                )}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 auto-rows-[250px] md:auto-rows-[100px]"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.1 }
                        }
                    }}
                >
                    {items.map((item, index) => (
                        <motion.div
                            key={item.id}
                            layout
                            layoutId={`media-${item.id}`}
                            className={cn("group relative overflow-hidden rounded-[2rem] cursor-move", item.span)}
                            onClick={() => !isDragging && setSelectedItem(item)}
                            variants={{
                                hidden: { y: 50, scale: 0.9, opacity: 0 },
                                visible: {
                                    y: 0,
                                    scale: 1,
                                    opacity: 1,
                                    transition: {
                                        type: "spring",
                                        stiffness: 350,
                                        damping: 25,
                                        delay: index * 0.05
                                    }
                                }
                            }}
                            whileHover={{ scale: 1.02 }}
                            drag={isMobile ? false : true}
                            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                            dragElastic={1}
                            onDragStart={() => setIsDragging(true)}
                            onDragEnd={(e, info) => {
                                setIsDragging(false);
                                const moveDistance = info.offset.x + info.offset.y;
                                if (Math.abs(moveDistance) > 100) {
                                    const newItems = [...items];
                                    const draggedItem = newItems[index];
                                    const targetIndex = moveDistance > 0 ?
                                        Math.min(index + 1, items.length - 1) :
                                        Math.max(index - 1, 0);
                                    newItems.splice(index, 1);
                                    newItems.splice(targetIndex, 0, draggedItem);
                                    setItems(newItems);
                                }
                            }}
                        >
                            <MediaItem
                                item={item}
                                className="absolute inset-0 w-full h-full"
                                onClick={() => !isDragging && setSelectedItem(item)}
                            />
                            <motion.div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/20 to-transparent p-8 flex flex-col justify-end">
                                    <h3 className="text-white text-2xl font-black uppercase tracking-tighter">
                                        {item.title}
                                    </h3>
                                    <p className="text-white/60 text-sm mt-1 uppercase font-bold tracking-widest">
                                        View Project
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </section>
    );
}

