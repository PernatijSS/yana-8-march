import { useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { GalleryCard } from './GalleryCard';
import { CardModal } from './CardModal';

interface GalleryItem {
  id: number;
  image: string;
  title: string;
  description: string;
  position: {
    desktop: { left: string; top: string };
    mobile: { left: string; top: string };
  };
  size: { width: string; height: string };
  zIndex: number;
  floatDelay: number;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1631606305238-b76ec0f86af3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMGNhbmRsZSUyMHdpbmUlMjBnbGFzc3xlbnwxfHx8fDE3NzI4OTcyMDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Elegant Evening',
    description: 'A perfect setting for an unforgettable evening.',
    position: {
      desktop: { left: '5%', top: '10%' },
      mobile: { left: '15%', top: '8%' }
    },
    size: { width: '240px', height: '320px' },
    zIndex: 3,
    floatDelay: 0
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1769787147452-921f573829bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwaGlnaCUyMGhlZWxzJTIwc2hvZXN8ZW58MXx8fHwxNzcyODk0OTI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Ready to Shine',
    description: 'Every detail matters when creating special moments.',
    position: {
      desktop: { left: '28%', top: '5%' },
      mobile: { left: '55%', top: '18%' }
    },
    size: { width: '200px', height: '280px' },
    zIndex: 5,
    floatDelay: 1.2
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1678779074138-cbe4f75513c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjByb3NlcyUyMGRhcmslMjBtb29keXxlbnwxfHx8fDE3NzI4OTcyMDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Timeless Beauty',
    description: 'Some things never go out of style.',
    position: {
      desktop: { left: '52%', top: '15%' },
      mobile: { left: '10%', top: '38%' }
    },
    size: { width: '220px', height: '300px' },
    zIndex: 2,
    floatDelay: 2.5
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1732644144489-b1974816d3c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdodCUyMGNpdHklMjBsaWdodHMlMjBib2tlaHxlbnwxfHx8fDE3NzI4OTcyMDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'City Lights',
    description: 'The magic of the city at night.',
    position: {
      desktop: { left: '75%', top: '8%' },
      mobile: { left: '50%', top: '52%' }
    },
    size: { width: '210px', height: '290px' },
    zIndex: 4,
    floatDelay: 0.8
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1758883424954-f1584e7e2baa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMGZsb3dlcnMlMjBqZXdlbHJ5fGVufDF8fHx8MTc3Mjg5NzIwNXww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Precious Moments',
    description: 'Treasures that last forever.',
    position: {
      desktop: { left: '8%', top: '48%' },
      mobile: { left: '20%', top: '70%' }
    },
    size: { width: '230px', height: '310px' },
    zIndex: 6,
    floatDelay: 1.8
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1695819685847-8e8afb30b4aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWlueSUyMHN0cmVldCUyMG5pZ2h0JTIwbGlnaHRzfGVufDF8fHx8MTc3Mjg3Nzk2OXww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Rainy Romance',
    description: 'Even the rain can be romantic.',
    position: {
      desktop: { left: '33%', top: '52%' },
      mobile: { left: '55%', top: '88%' }
    },
    size: { width: '250px', height: '340px' },
    zIndex: 1,
    floatDelay: 3.2
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1641924676490-cd948c956b7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZGlubmVyJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NzI4OTcyMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Fine Dining',
    description: 'An experience to remember.',
    position: {
      desktop: { left: '62%', top: '55%' },
      mobile: { left: '15%', top: '108%' }
    },
    size: { width: '215px', height: '295px' },
    zIndex: 7,
    floatDelay: 2.0
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1760274844180-30f08c126c1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMGV2ZW5pbmclMjBjYW5kbGVzfGVufDF8fHx8MTc3Mjg5NzIwNnww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Candlelight Dreams',
    description: 'A moment captured in time.',
    position: {
      desktop: { left: '82%', top: '50%' },
      mobile: { left: '50%', top: '128%' }
    },
    size: { width: '205px', height: '285px' },
    zIndex: 8,
    floatDelay: 1.5
  },
  {
    id: 9,
    image: 'https://images.unsplash.com/photo-1772191399367-91ed8d95664b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwcGVyZnVtZSUyMGJvdHRsZSUyMGRhcmt8ZW58MXx8fHwxNzcyODk4NTQ0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Essence',
    description: 'The scent of memories.',
    position: {
      desktop: { left: '18%', top: '78%' },
      mobile: { left: '25%', top: '148%' }
    },
    size: { width: '225px', height: '305px' },
    zIndex: 9,
    floatDelay: 0.5
  },
  {
    id: 10,
    image: 'https://images.unsplash.com/photo-1763913603709-74997cc8a299?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaCUyMGpld2VscnklMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzI4OTg1NDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Time Stands Still',
    description: 'Every second counts.',
    position: {
      desktop: { left: '45%', top: '82%' },
      mobile: { left: '55%', top: '165%' }
    },
    size: { width: '235px', height: '315px' },
    zIndex: 10,
    floatDelay: 2.8
  }
];

export function Gallery() {
  const [modalData, setModalData] = useState<{
    title: string;
    description: string;
    position: { x: number; y: number };
  } | null>(null);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleOpenModal = (title: string, description: string, position: { x: number; y: number }) => {
    // Adjust position for viewport bounds
    const adjustedX = Math.min(Math.max(position.x, 20), window.innerWidth - 320);
    const adjustedY = Math.min(Math.max(position.y, 20), window.innerHeight - 220);
    
    setModalData({ title, description, position: { x: adjustedX, y: adjustedY } });
  };

  const handleCloseModal = () => {
    setModalData(null);
  };

  return (
    <>
      <div 
        ref={galleryRef}
        className="relative min-h-screen w-full pt-32 pb-24 px-4 overflow-hidden"
        style={{ minHeight: 'max(100vh, 200vh)' }}
      >
        {galleryItems.map((item) => (
          <GalleryCard
            key={item.id}
            image={item.image}
            title={item.title}
            description={item.description}
            position={item.position}
            size={item.size}
            zIndex={item.zIndex}
            floatDelay={item.floatDelay}
            mousePosition={mousePosition}
            onOpenModal={handleOpenModal}
          />
        ))}
      </div>

      <AnimatePresence>
        {modalData && (
          <CardModal
            title={modalData.title}
            description={modalData.description}
            position={modalData.position}
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>
    </>
  );
}
