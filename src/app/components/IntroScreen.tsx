import { motion } from 'motion/react';

interface IntroScreenProps {
  onComplete: () => void;
}

export function IntroScreen({ onComplete }: IntroScreenProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="text-center"
        initial={{ filter: 'blur(20px)', opacity: 0 }}
        animate={{ 
          filter: ['blur(20px)', 'blur(0px)', 'blur(0px)', 'blur(20px)'],
          opacity: [0, 1, 1, 0]
        }}
        transition={{ 
          duration: 4,
          times: [0, 0.3, 0.7, 1],
          ease: "easeInOut"
        }}
        onAnimationComplete={onComplete}
      >
        <h1 className="text-6xl md:text-7xl text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
          Яна,
        </h1>
        <p className="text-4xl md:text-5xl text-white/90 mt-2" style={{ fontFamily: 'Playfair Display, serif' }}>
          с 8 марта
        </p>
      </motion.div>
    </motion.div>
  );
}
