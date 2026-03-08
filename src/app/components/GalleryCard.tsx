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
  size: {
    desktop: { width: string; height: string };
    mobile: { width: string; height: string };
  };
  zIndex: number;
  floatDelay: number;
  rotation: number;
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
  rotation,
  mousePosition,
  onOpenModal
}: GalleryCardProps) {
  /**
   * hover-эффект для десктопа
   */
  const [isHovered, setIsHovered] = useState(false);

  /**
   * небольшое движение карточек от мышки на десктопе
   */
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });

  /**
   * определяем мобильный экран
   */
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

  /**
   * Лёгкий параллакс только на десктопе
   */
  useEffect(() => {
    if (!cardRef.current || isMobile) return;

    const viewportCenterX = window.innerWidth / 2;
    const viewportCenterY = window.innerHeight / 2;

    const deltaX = (mousePosition.x - viewportCenterX) / viewportCenterX;
    const deltaY = (mousePosition.y - viewportCenterY) / viewportCenterY;

    const maxParallax = 10;

    setParallaxOffset({
      x: deltaX * maxParallax * (zIndex / 10),
      y: deltaY * maxParallax * (zIndex / 10)
    });
  }, [mousePosition, isMobile, zIndex]);

  /**
   * По клику открываем модалку.
   * На мобилке — чуть выше карточки,
   * на десктопе — справа от неё.
   */
  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();

    if (window.innerWidth <= 768) {
      onOpenModal(title, description, {
        x: Math.max(16, rect.left - 8),
        y: rect.top - 170
      });
      return;
    }

    onOpenModal(title, description, {
      x: rect.right + 20,
      y: rect.top
    });
  };

  const currentPosition = isMobile ? position.mobile : position.desktop;
  const currentSize = isMobile ? size.mobile : size.desktop;

  return (
    <motion.div
      ref={cardRef}
      className="absolute overflow-hidden rounded-xl cursor-pointer shadow-2xl select-none will-change-transform"
      style={{
        left: currentPosition.left,
        top: currentPosition.top,
        width: currentSize.width,
        height: currentSize.height,
        zIndex: isHovered ? 999 : zIndex
      }}
      onHoverStart={() => {
        if (!isMobile) setIsHovered(true);
      }}
      onHoverEnd={() => {
        if (!isMobile) setIsHovered(false);
      }}
      onClick={handleClick}
      initial={{
        opacity: 0,
        scale: 0.92,
        rotate: rotation
      }}
      animate={{
        opacity: 1,
        x: isMobile ? 0 : parallaxOffset.x,
        y: isMobile ? [0, -4, 0, 4, 0] : [0, -6, 0, 6, 0],
        scale: isHovered ? 1.04 : 1,
        rotate: isHovered ? rotation + 1 : rotation
      }}
      transition={{
        opacity: { duration: 0.45, delay: floatDelay * 0.08 },
        scale: { duration: 0.25 },
        rotate: { duration: 0.25 },
        x: { duration: 0.35, ease: 'easeOut' },
        y: {
          duration: isMobile ? 8 + floatDelay : 10 + floatDelay,
          repeat: Infinity,
          ease: 'easeInOut'
        }
      }}
    >
      <div
        className="w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url("${image}")`
        }}
      />

      <div className="absolute inset-0 bg-black/10 pointer-events-none" />

      <motion.div
        className="absolute inset-0 bg-white/0 pointer-events-none"
        animate={{
          backgroundColor: isHovered ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0)'
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
}