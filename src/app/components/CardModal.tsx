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
      {/* 
        Затемнение под модалкой.
        Поднимаем z-index выше всей галереи, чтобы ничего не перебивало модалку.
      */}
      <motion.div
        className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-[1200]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      />

      {/*
        Сама маленькая модалка карточки.
        z-index делаем ещё выше, чем у подложки.
      */}
      <motion.div
        className="fixed z-[1300] bg-white rounded-xl p-5 md:p-6 shadow-2xl w-[calc(100vw-32px)] max-w-[280px] md:w-auto"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
        initial={{ opacity: 0, scale: 0.95, y: 6 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 6 }}
        transition={{
          duration: 0.28,
          ease: [0.4, 0, 0.2, 1]
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
          type="button"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Заголовок карточки */}
        <h3
          className="text-base mb-2 pr-6 text-gray-900"
          style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600 }}
        >
          {title}
        </h3>

        {/* Описание карточки */}
        <p
          className="text-xs text-gray-600 leading-relaxed"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {description}
        </p>
      </motion.div>
    </>
  );
}