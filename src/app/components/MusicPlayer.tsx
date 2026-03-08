import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'motion/react';

export function MusicPlayer() {
  /**
   * muted:
   * false = звук включен
   * true  = звук выключен
   */
  const [isMuted, setIsMuted] = useState(false);

  /**
   * ТЕКУЩАЯ ГРОМКОСТЬ.
   * На старте ставим 0, чтобы потом плавно поднять до targetVolume.
   */
  const [volume, setVolume] = useState(0);

  /**
   * ЦЕЛЕВАЯ ГРОМКОСТЬ ПОСЛЕ FADE-IN.
   * 0.15 = 15%
   * Если захочешь 20%, поменяй на 0.2
   */
  const targetVolume = 0.15;

  /**
   * Управление видимостью панели:
   * - на десктопе открывается по hover
   * - на мобилке открывается по tap/click
   */
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  /**
   * Определяем, мобильное устройство или нет.
   * Здесь ориентируемся на ширину окна.
   */
  const [isMobile, setIsMobile] = useState(false);

  /**
   * Ссылка на HTML audio
   */
  const audioRef = useRef<HTMLAudioElement>(null);

  /**
   * Нужен для контейнера плеера.
   * Используем, чтобы закрывать панель на мобилке по клику вне неё.
   */
  const playerRef = useRef<HTMLDivElement>(null);

  /**
   * ID интервала fade-in.
   * Через него плавно поднимаем громкость.
   */
  const fadeIntervalRef = useRef<number | null>(null);

  /**
   * Определяем mobile / desktop
   */
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  /**
   * ПЛАВНОЕ ПОДНЯТИЕ ГРОМКОСТИ С 0 ДО targetVolume
   *
   * Как работает:
   * - сразу после старта ставим 0
   * - каждые 120мс немного увеличиваем громкость
   * - когда дошли до targetVolume — останавливаемся
   *
   * Если хочешь сделать fade быстрее:
   * - увеличь шаг (step), например 0.02
   * - или уменьши intervalMs
   *
   * Если хочешь сделать fade мягче и дольше:
   * - уменьши step, например 0.005
   * - или увеличь intervalMs
   */
  const startFadeIn = () => {
    const audio = audioRef.current;
    if (!audio || isMuted) return;

    // Если уже был старый fade — очищаем
    if (fadeIntervalRef.current) {
      window.clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }

    const step = 0.01;
    const intervalMs = 120;

    audio.volume = 0;
    setVolume(0);

    fadeIntervalRef.current = window.setInterval(() => {
      const currentAudio = audioRef.current;
      if (!currentAudio) return;

      const nextVolume = Math.min(currentAudio.volume + step, targetVolume);

      currentAudio.volume = nextVolume;
      setVolume(nextVolume);

      if (nextVolume >= targetVolume) {
        if (fadeIntervalRef.current) {
          window.clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;
        }
      }
    }, intervalMs);
  };

  /**
   * Основная попытка запуска музыки при загрузке сайта
   */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // На старте музыка не в mute
    audio.muted = false;
    setIsMuted(false);

    // На старте громкость 0 — для fade-in
    audio.volume = 0;
    setVolume(0);

    // Заранее подгружаем аудио
    audio.load();

    const tryAutoplay = async () => {
      try {
        await audio.play();
        startFadeIn();
      } catch (error) {
        console.log('Браузер заблокировал autoplay. Ждём первое действие пользователя.', error);
      }
    };

    tryAutoplay();

    /**
     * Если autoplay заблокировали,
     * после первого взаимодействия пробуем снова.
     */
    const handleFirstInteraction = async () => {
      try {
        audio.muted = false;
        setIsMuted(false);

        await audio.play();
        startFadeIn();
      } catch (error) {
        console.log('Не удалось запустить музыку после первого действия пользователя.', error);
      }

      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);

      if (fadeIntervalRef.current) {
        window.clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }
    };
  }, []);

  /**
   * Если пользователь сам меняет громкость —
   * обновляем audio.volume
   */
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  /**
   * Если пользователь нажал mute/unmute —
   * обновляем audio.muted
   */
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = isMuted;
  }, [isMuted]);

  /**
   * Закрытие мобильной панели по клику вне плеера
   */
  useEffect(() => {
    if (!isMobileOpen) return;

    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (playerRef.current && !playerRef.current.contains(target)) {
        setIsMobileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [isMobileOpen]);

  /**
   * Кнопка mute/unmute
   *
   * Что делает:
   * - если аудио стоит на паузе, пытается включить
   * - переключает muted
   * - если включаем звук и громкость 0, возвращаем её на targetVolume
   */
  const toggleMute = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
      } catch (error) {
        console.log('Не удалось запустить аудио через кнопку mute/unmute.', error);
      }
    }

    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    audio.muted = nextMuted;

    // Если звук включаем обратно и громкость 0 — возвращаем рабочую громкость
    if (!nextMuted && audio.volume === 0) {
      audio.volume = targetVolume;
      setVolume(targetVolume);
    }
  };

  /**
   * Ползунок громкости
   *
   * Если пользователь меняет громкость:
   * - обновляем volume
   * - если громкость 0 => ставим mute
   * - если громкость больше 0 => снимаем mute
   */
  const handleVolumeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    const newVolume = parseFloat(e.target.value);

    setVolume(newVolume);

    if (audio) {
      audio.volume = newVolume;

      if (audio.paused) {
        try {
          await audio.play();
        } catch (error) {
          console.log('Не удалось запустить аудио при изменении громкости.', error);
        }
      }
    }

    if (newVolume === 0) {
      setIsMuted(true);
      if (audio) audio.muted = true;
    } else {
      setIsMuted(false);
      if (audio) audio.muted = false;
    }
  };

  /**
   * На десктопе панель открыта, когда есть hover
   * На мобилке — когда пользователь тапнул по плееру
   */
  const isPanelVisible = isMobile ? isMobileOpen : isHovered;

  /**
   * Клик по самому контейнеру на мобилке:
   * открывает / закрывает панель
   */
  const handleContainerClick = () => {
    if (!isMobile) return;
    setIsMobileOpen((prev) => !prev);
  };

  return (
    <motion.div
      ref={playerRef}
      className="fixed bottom-6 right-6 z-30"
      onHoverStart={() => {
        if (!isMobile) setIsHovered(true);
      }}
      onHoverEnd={() => {
        if (!isMobile) setIsHovered(false);
      }}
      onClick={handleContainerClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-3 flex items-center gap-3 cursor-pointer">
        <button
          onClick={(e) => {
            // Чтобы клик по кнопке не дёргал мобильное раскрытие дважды
            e.stopPropagation();
            toggleMute();
          }}
          className="text-white/80 hover:text-white transition-colors shrink-0"
          type="button"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>

        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{
            width: isPanelVisible ? 'auto' : 0,
            opacity: isPanelVisible ? 1 : 0
          }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div
            className={`flex items-center gap-3 pr-2 ${
              isMobile ? 'max-w-[220px]' : ''
            }`}
          >
            <span
              className="text-white/70 text-sm whitespace-nowrap"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Sleep Token - Caramel
            </span>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              onClick={(e) => e.stopPropagation()}
              className="w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
            />
          </div>
        </motion.div>
      </div>

      <audio ref={audioRef} loop preload="auto">
        {/**
         * ПУТЬ К МУЗЫКЕ
         *
         * Сейчас ожидается, что файл лежит здесь:
         * public/music/Sleep Token - Caramel.mp3
         *
         * Если переименуешь файл, поменяй src ниже.
         */}
        <source src="/music/Sleep Token - Caramel.mp3" type="audio/mpeg" />
        Ваш браузер не поддерживает аудио.
      </audio>
    </motion.div>
  );
}