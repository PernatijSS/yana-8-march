import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface GlassButtonProps {
  onClick: () => void;
}

const buttonTexts = [
  'нажми на меня',
  'нажми быстрее',
  'ну нажми',
  'давай же'
];

export function GlassButton({ onClick }: GlassButtonProps) {
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % buttonTexts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.button
      onClick={onClick}
      className="fixed top-8 left-1/2 -translate-x-1/2 z-30 px-8 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-colors duration-300 min-w-[200px]"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative h-6 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={textIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute text-white/90"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {buttonTexts[textIndex]}
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.button>
  );
}