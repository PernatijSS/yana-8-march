import { motion } from 'motion/react';
import { X } from 'lucide-react';

interface CardModalProps {
  title: string;
  description: string;
  position: { x: number; y: number };
  onClose: () => void;
}

export function CardModal({ title, description, position, onClose }: CardModalProps) {
  return (
    <>
      <motion.div
        className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      />
      <motion.div
        className="fixed z-50 bg-white rounded-xl p-6 shadow-2xl max-w-[280px]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ 
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1]
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        <h3 className="text-base mb-2 pr-6 text-gray-900" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>
          {title}
        </h3>
        <p className="text-xs text-gray-600 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
          {description}
        </p>
      </motion.div>
    </>
  );
}
