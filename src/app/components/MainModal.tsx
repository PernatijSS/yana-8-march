import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface MainModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MainModal({ isOpen, onClose }: MainModalProps) {
  /**
   * confirmed = нажали ли на кнопку "Да, иду"
   */
  const [confirmed, setConfirmed] = useState(false);

  /**
   * Нажатие на кнопку подтверждения
   */
  const handleConfirm = () => {
    setConfirmed(true);
  };

  /**
   * Закрытие модалки:
   * сбрасываем состояние, чтобы при следующем открытии
   * снова показывался первый экран
   */
  const handleClose = () => {
    setConfirmed(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Затемнение фона */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClose}
          />

          {/*
            Основная модалка.
            На мобилке не вылезает за экран благодаря w-[calc(100vw-24px)].
          */}
          <motion.div
            className="fixed top-1/2 left-1/2 z-[2200] -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-24px)] max-w-lg px-3 sm:px-0"
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 sm:p-6 md:p-10 border border-white/20 shadow-2xl relative overflow-hidden">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-white/60 hover:text-white/90 transition-colors"
                type="button"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              <AnimatePresence mode="wait">
                {!confirmed ? (
                  <motion.div
                    key="initial"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <h2
                      className="text-3xl sm:text-4xl md:text-5xl text-white mb-5 sm:mb-6 pr-8"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      Яна,<br />с 8 марта.
                    </h2>

                    <div
                      className="text-white/90 text-sm sm:text-base md:text-lg space-y-3 mb-6 sm:mb-8"
                      style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.7' }}
                    >
                      <p>Я просто хочу сказать,<br />что ты правда очень крутая.</p>
                      <p>И я искренне рад,<br />что ты есть в моей жизни.</p>
                      <p>Ты очень сильно выросла<br />за последнее время —</p>
                      <p>и как человек,<br />и как профессионал.</p>
                      <p>Будь готова к 18:00.</p>
                    </div>

                    <button
                      onClick={handleConfirm}
                      className="w-full py-3 px-6 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white hover:bg-white/30 transition-all duration-300"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                      type="button"
                    >
                      Да, иду
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="confirmed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-center py-6 sm:py-8"
                  >
                    <h2
                      className="text-3xl sm:text-4xl md:text-5xl text-white mb-4"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      Отлично.
                    </h2>

                    <p
                      className="text-white/90 text-base sm:text-lg md:text-xl leading-relaxed"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      Будь готова к 18:00<br />
                      и подтверди это ещё раз в ТГ.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}