import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';

interface GalleryCardProps {
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
  mousePosition: { x: number; y: number };
  onOpenModal: (title: string, description: string, position: { x: number; y: number }) => void;
}

export function GalleryCard({ 
  image, 
  title, 
  description, 
  position,
  size,
  zIndex,
  floatDelay,
  mousePosition,
  onOpenModal 
}: GalleryCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!cardRef.current || isMobile) return;

    const rect = cardRef.current.getBoundingClientRect();
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;

    // Calculate parallax based on distance from center of viewport
    const viewportCenterX = window.innerWidth / 2;
    const viewportCenterY = window.innerHeight / 2;
    
    const deltaX = (mousePosition.x - viewportCenterX) / viewportCenterX;
    const deltaY = (mousePosition.y - viewportCenterY) / viewportCenterY;

    // Apply subtle parallax movement (max 12px)
    const maxParallax = 12;
    setParallaxOffset({
      x: deltaX * maxParallax * (zIndex / 10),
      y: deltaY * maxParallax * (zIndex / 10)
    });
  }, [mousePosition, isMobile, zIndex]);

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    onOpenModal(title, description, {
      x: rect.right + 20,
      y: rect.top
    });
  };

  const currentPosition = isMobile ? position.mobile : position.desktop;
  const currentSize = isMobile 
    ? { width: 'min(60vw, 240px)', height: 'auto' }
    : size;

  return (
    <motion.div
      ref={cardRef}
      className="absolute overflow-hidden rounded-lg cursor-pointer shadow-2xl"
      style={{
        left: currentPosition.left,
        top: currentPosition.top,
        width: currentSize.width,
        height: currentSize.height,
        aspectRatio: isMobile ? '3/4' : 'auto',
        zIndex: isHovered ? 999 : zIndex,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
      animate={{
        x: isMobile ? 0 : parallaxOffset.x,
        y: isMobile ? 0 : parallaxOffset.y,
        scale: isHovered ? 1.05 : 1,
      }}
      transition={{ 
        type: 'spring',
        stiffness: 100,
        damping: 25,
        mass: 0.8
      }}
    >
      {/* Floating animation container */}
      <motion.div
        className="w-full h-full"
        animate={{
          y: isMobile ? 0 : [0, -6, 0],
        }}
        transition={{
          duration: 7 + floatDelay,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay
        }}
      >
        {/* Image with crop effect on hover */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${image})`,
          }}
          animate={{
            scale: isHovered ? 1.08 : 1,
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        
        {/* Darkening overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-black"
          animate={{
            opacity: isHovered ? 0.2 : 0
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
}
