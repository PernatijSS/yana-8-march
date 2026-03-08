import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface MainModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MainModal({ isOpen, onClose }: MainModalProps) {
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    setConfirmed(true);
  };

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
            Внешний контейнер модалки.
            Вместо жёсткого центрирования через translate по вертикали
            делаем безопасную область с отступами сверху и снизу.
          */}
          <motion.div
            className="fixed inset-0 z-[2200] flex items-center justify-center px-3 py-4 sm:py-6"
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.3 }}
          >
            {/* 
              Сама модалка.
              max-h задаёт максимальную высоту относительно экрана.
              overflow-y-auto включает внутренний скролл, если текста много.
            */}
            <div className="w-full max-w-lg max-h-[calc(100vh-32px)] sm:max-h-[calc(100vh-48px)] overflow-y-auto bg-white/10 backdrop-blur-xl rounded-2xl p-5 sm:p-6 md:p-10 border border-white/20 shadow-2xl relative">
              {/* Кнопка закрытия */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
                type="button"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <AnimatePresence mode="wait">
                {!confirmed ? (
                  <motion.div
                    key="text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* Заголовок */}
                    <h2
                      className="text-3xl sm:text-4xl md:text-5xl text-white mb-5 sm:mb-6 pr-8"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      Яна,<br />с 8 марта
                    </h2>

                    {/* Текст */}
                    <div
                      className="text-white/90 text-sm sm:text-base md:text-lg space-y-3 sm:space-y-4 mb-6 sm:mb-8"
                      style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.7' }}
                    >
                      <p>
                        Это лишь ещё один день из многих, который напоминает тебе о том,
                        какая ты на самом деле.
                      </p>

                      <p>
                        Сильная, красивая, целеустремлённая и самая замечательная.
                      </p>

                      <p>
                        В тебе очень много энергии и внутренней силы. Пожалуйста,
                        никогда не забывай об этом.
                      </p>

                      <p>
                        Я очень рад, что между нами есть связь и что мы есть друг у друга.
                        Спасибо тебе за это.
                      </p>

                      <p>
                        Я правда очень рад, что рядом со мной именно такая девушка.
                      </p>

                      <p>
                        И как и в любой другой день, но особенно сегодня, я хочу провести
                        этот праздник вместе с тобой.
                      </p>

                      <p>
                        Будь готова <strong>9 марта в 18:00.</strong>
                      </p>

                      <p>
                        Подробности узнаешь чуть ближе к вечеру.
                      </p>
                    </div>

                    {/* Кнопка подтверждения */}
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
                    className="text-center py-6 sm:py-8"
                  >
                    <h2
                      className="text-3xl sm:text-4xl md:text-5xl text-white mb-4"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      Отлично
                    </h2>

                    <p
                      className="text-white/90 text-base sm:text-lg leading-relaxed"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      Будь готова к 18:00<br />
                      и подтверди это ещё раз в ТГ
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