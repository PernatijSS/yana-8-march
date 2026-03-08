import { useEffect, useMemo, useState } from 'react';
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
  size: {
    desktop: { width: string; height: string };
    mobile: { width: string; height: string };
  };
  zIndex: number;
  floatDelay: number;
  rotation?: number;
}

/**
 * ПЕРВАЯ РАСКЛАДКА ФОТО
 * Это одна композиция карточек на экран.
 */
const heroGalleryItems: GalleryItem[] = [
  {
    id: 1,
    image: '/images/1.jpg',
    title: 'Фото 1',
    description: 'Изображение из папки public/images/1.jpg.',
    position: {
      desktop: { left: '4%', top: '14%' },
      mobile: { left: '4%', top: '18%' }
    },
    size: {
      desktop: { width: '180px', height: '245px' },
      mobile: { width: '110px', height: '150px' }
    },
    zIndex: 2,
    floatDelay: 0,
    rotation: -6
  },
  {
    id: 2,
    image: '/images/2.jpg',
    title: 'Фото 2',
    description: 'Изображение из папки public/images/2.jpg.',
    position: {
      desktop: { left: '21%', top: '4%' },
      mobile: { left: '30%', top: '8%' }
    },
    size: {
      desktop: { width: '155px', height: '215px' },
      mobile: { width: '95px', height: '130px' }
    },
    zIndex: 4,
    floatDelay: 0.6,
    rotation: 4
  },
  {
    id: 3,
    image: '/images/3.jpg',
    title: 'Фото 3',
    description: 'Изображение из папки public/images/3.jpg.',
    position: {
      desktop: { left: '39%', top: '10%' },
      mobile: { left: '52%', top: '14%' }
    },
    size: {
      desktop: { width: '170px', height: '250px' },
      mobile: { width: '108px', height: '152px' }
    },
    zIndex: 3,
    floatDelay: 1.1,
    rotation: -3
  },
  {
    id: 4,
    image: '/images/4.jpg',
    title: 'Фото 4',
    description: 'Изображение из папки public/images/4.jpg.',
    position: {
      desktop: { left: '58%', top: '7%' },
      mobile: { left: '70%', top: '7%' }
    },
    size: {
      desktop: { width: '145px', height: '205px' },
      mobile: { width: '90px', height: '125px' }
    },
    zIndex: 5,
    floatDelay: 1.7,
    rotation: 5
  },
  {
    id: 5,
    image: '/images/5.jpg',
    title: 'Фото 5',
    description: 'Изображение из папки public/images/5.jpg.',
    position: {
      desktop: { left: '77%', top: '16%' },
      mobile: { left: '76%', top: '26%' }
    },
    size: {
      desktop: { width: '165px', height: '230px' },
      mobile: { width: '102px', height: '142px' }
    },
    zIndex: 2,
    floatDelay: 2.2,
    rotation: -4
  },
  {
    id: 6,
    image: '/images/6.jpg',
    title: 'Фото 6',
    description: 'Изображение из папки public/images/6.jpg.',
    position: {
      desktop: { left: '11%', top: '53%' },
      mobile: { left: '14%', top: '42%' }
    },
    size: {
      desktop: { width: '210px', height: '285px' },
      mobile: { width: '132px', height: '182px' }
    },
    zIndex: 7,
    floatDelay: 0.9,
    rotation: 3
  },
  {
    id: 7,
    image: '/images/7.jpg',
    title: 'Фото 7',
    description: 'Изображение из папки public/images/7.jpg.',
    position: {
      desktop: { left: '32%', top: '48%' },
      mobile: { left: '42%', top: '36%' }
    },
    size: {
      desktop: { width: '150px', height: '210px' },
      mobile: { width: '92px', height: '128px' }
    },
    zIndex: 6,
    floatDelay: 1.5,
    rotation: -7
  },
  {
    id: 8,
    image: '/images/8.jpg',
    title: 'Фото 8',
    description: 'Изображение из папки public/images/8.jpg.',
    position: {
      desktop: { left: '47%', top: '55%' },
      mobile: { left: '64%', top: '46%' }
    },
    size: {
      desktop: { width: '245px', height: '330px' },
      mobile: { width: '145px', height: '195px' }
    },
    zIndex: 10,
    floatDelay: 2.5,
    rotation: 2
  },
  {
    id: 9,
    image: '/images/9.jpg',
    title: 'Фото 9',
    description: 'Изображение из папки public/images/9.jpg.',
    position: {
      desktop: { left: '69%', top: '52%' },
      mobile: { left: '12%', top: '66%' }
    },
    size: {
      desktop: { width: '155px', height: '220px' },
      mobile: { width: '94px', height: '132px' }
    },
    zIndex: 4,
    floatDelay: 0.3,
    rotation: -5
  },
  {
    id: 10,
    image: '/images/10.jpg',
    title: 'Фото 10',
    description: 'Изображение из папки public/images/10.jpg.',
    position: {
      desktop: { left: '84%', top: '50%' },
      mobile: { left: '58%', top: '64%' }
    },
    size: {
      desktop: { width: '125px', height: '185px' },
      mobile: { width: '82px', height: '118px' }
    },
    zIndex: 3,
    floatDelay: 1.9,
    rotation: 6
  }
];

/**
 * ВТОРАЯ РАСКЛАДКА ФОТО
 * Нужна, чтобы следующая "страница" выглядела не точной копией.
 */
const altGalleryItems: GalleryItem[] = [
  {
    id: 101,
    image: '/images/1.jpg',
    title: 'Фото 1',
    description: 'Изображение из папки public/images/1.jpg.',
    position: {
      desktop: { left: '8%', top: '20%' },
      mobile: { left: '6%', top: '10%' }
    },
    size: {
      desktop: { width: '170px', height: '230px' },
      mobile: { width: '108px', height: '146px' }
    },
    zIndex: 3,
    floatDelay: 0.2,
    rotation: 5
  },
  {
    id: 102,
    image: '/images/2.jpg',
    title: 'Фото 2',
    description: 'Изображение из папки public/images/2.jpg.',
    position: {
      desktop: { left: '25%', top: '8%' },
      mobile: { left: '38%', top: '2%' }
    },
    size: {
      desktop: { width: '135px', height: '190px' },
      mobile: { width: '88px', height: '120px' }
    },
    zIndex: 2,
    floatDelay: 1.4,
    rotation: -4
  },
  {
    id: 103,
    image: '/images/3.jpg',
    title: 'Фото 3',
    description: 'Изображение из папки public/images/3.jpg.',
    position: {
      desktop: { left: '40%', top: '16%' },
      mobile: { left: '67%', top: '10%' }
    },
    size: {
      desktop: { width: '220px', height: '295px' },
      mobile: { width: '132px', height: '178px' }
    },
    zIndex: 7,
    floatDelay: 1.1,
    rotation: 2
  },
  {
    id: 104,
    image: '/images/4.jpg',
    title: 'Фото 4',
    description: 'Изображение из папки public/images/4.jpg.',
    position: {
      desktop: { left: '67%', top: '10%' },
      mobile: { left: '18%', top: '32%' }
    },
    size: {
      desktop: { width: '150px', height: '215px' },
      mobile: { width: '96px', height: '132px' }
    },
    zIndex: 4,
    floatDelay: 2.0,
    rotation: -6
  },
  {
    id: 105,
    image: '/images/5.jpg',
    title: 'Фото 5',
    description: 'Изображение из папки public/images/5.jpg.',
    position: {
      desktop: { left: '82%', top: '23%' },
      mobile: { left: '54%', top: '28%' }
    },
    size: {
      desktop: { width: '150px', height: '205px' },
      mobile: { width: '92px', height: '126px' }
    },
    zIndex: 2,
    floatDelay: 0.7,
    rotation: 4
  },
  {
    id: 106,
    image: '/images/6.jpg',
    title: 'Фото 6',
    description: 'Изображение из папки public/images/6.jpg.',
    position: {
      desktop: { left: '15%', top: '55%' },
      mobile: { left: '12%', top: '56%' }
    },
    size: {
      desktop: { width: '235px', height: '320px' },
      mobile: { width: '140px', height: '188px' }
    },
    zIndex: 8,
    floatDelay: 1.8,
    rotation: -2
  },
  {
    id: 107,
    image: '/images/7.jpg',
    title: 'Фото 7',
    description: 'Изображение из папки public/images/7.jpg.',
    position: {
      desktop: { left: '41%', top: '58%' },
      mobile: { left: '49%', top: '52%' }
    },
    size: {
      desktop: { width: '150px', height: '205px' },
      mobile: { width: '95px', height: '128px' }
    },
    zIndex: 4,
    floatDelay: 0.9,
    rotation: 6
  },
  {
    id: 108,
    image: '/images/8.jpg',
    title: 'Фото 8',
    description: 'Изображение из папки public/images/8.jpg.',
    position: {
      desktop: { left: '55%', top: '46%' },
      mobile: { left: '70%', top: '62%' }
    },
    size: {
      desktop: { width: '210px', height: '285px' },
      mobile: { width: '125px', height: '170px' }
    },
    zIndex: 9,
    floatDelay: 2.3,
    rotation: -3
  },
  {
    id: 109,
    image: '/images/9.jpg',
    title: 'Фото 9',
    description: 'Изображение из папки public/images/9.jpg.',
    position: {
      desktop: { left: '74%', top: '60%' },
      mobile: { left: '22%', top: '76%' }
    },
    size: {
      desktop: { width: '140px', height: '195px' },
      mobile: { width: '90px', height: '122px' }
    },
    zIndex: 3,
    floatDelay: 0.4,
    rotation: 3
  },
  {
    id: 110,
    image: '/images/10.jpg',
    title: 'Фото 10',
    description: 'Изображение из папки public/images/10.jpg.',
    position: {
      desktop: { left: '87%', top: '52%' },
      mobile: { left: '58%', top: '82%' }
    },
    size: {
      desktop: { width: '120px', height: '170px' },
      mobile: { width: '78px', height: '108px' }
    },
    zIndex: 1,
    floatDelay: 1.6,
    rotation: -5
  }
];

type SectionPattern = 'hero' | 'alt';

export function Gallery() {
  const [modalData, setModalData] = useState<{
    title: string;
    description: string;
    position: { x: number; y: number };
  } | null>(null);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  /**
   * Сколько экранов рендерим в ленте.
   * Чем больше число — тем спокойнее работает "бесконечность".
   */
  const LOOP_BLOCK_COUNT = 10;

  /**
   * Собираем ленту из чередующихся секций:
   * hero, alt, hero, alt...
   */
  const sections = useMemo(
    () =>
      Array.from({ length: LOOP_BLOCK_COUNT }, (_, index) =>
        (index % 2 === 0 ? 'hero' : 'alt') as SectionPattern
      ),
    []
  );

  /**
   * Для лёгкого движения карточек на десктопе.
   */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  /**
   * При первом открытии ставим пользователя не в самое начало,
   * а примерно в середину ленты.
   * Тогда можно крутить и вниз, и вверх.
   */
  useEffect(() => {
    const initPosition = () => {
      const viewportHeight = window.innerHeight;
      const middleIndex = Math.floor(LOOP_BLOCK_COUNT / 2);

      window.scrollTo({
        top: middleIndex * viewportHeight,
        behavior: 'auto'
      });
    };

    const timeout = window.setTimeout(initPosition, 30);

    return () => window.clearTimeout(timeout);
  }, []);

  /**
   * Логика бесконечного скролла.
   *
   * Когда пользователь слишком близко подходит к верху или низу,
   * мы мгновенно переносим его обратно в центральную часть.
   * За счёт этого визуально кажется, что скролл бесконечный.
   */
  useEffect(() => {
    let isJumping = false;

    const handleInfiniteScroll = () => {
      if (isJumping) return;

      const viewportHeight = window.innerHeight;
      const totalHeight = LOOP_BLOCK_COUNT * viewportHeight;
      const currentScroll = window.scrollY;

      const topThreshold = viewportHeight * 1.5;
      const bottomThreshold = totalHeight - viewportHeight * 1.5;

      if (currentScroll < topThreshold) {
        isJumping = true;

        window.scrollTo({
          top: currentScroll + viewportHeight * 4,
          behavior: 'auto'
        });

        requestAnimationFrame(() => {
          isJumping = false;
        });
      }

      if (currentScroll > bottomThreshold) {
        isJumping = true;

        window.scrollTo({
          top: currentScroll - viewportHeight * 4,
          behavior: 'auto'
        });

        requestAnimationFrame(() => {
          isJumping = false;
        });
      }
    };

    window.addEventListener('scroll', handleInfiniteScroll, { passive: true });
    window.addEventListener('resize', handleInfiniteScroll);

    return () => {
      window.removeEventListener('scroll', handleInfiniteScroll);
      window.removeEventListener('resize', handleInfiniteScroll);
    };
  }, []);

  /**
   * Открытие модалки рядом с карточкой.
   */
  const handleOpenModal = (
    title: string,
    description: string,
    position: { x: number; y: number }
  ) => {
    const modalWidth = window.innerWidth <= 768 ? window.innerWidth - 32 : 320;
    const modalHeight = 220;

    const adjustedX = Math.min(
      Math.max(position.x, 16),
      window.innerWidth - modalWidth - 16
    );

    const adjustedY = Math.min(
      Math.max(position.y, 16),
      window.innerHeight - modalHeight - 16
    );

    setModalData({
      title,
      description,
      position: { x: adjustedX, y: adjustedY }
    });
  };

  const handleCloseModal = () => {
    setModalData(null);
  };

  return (
    <>
      {sections.map((pattern, sectionIndex) => {
        const items = pattern === 'hero' ? heroGalleryItems : altGalleryItems;

        return (
          <section
            key={`gallery-section-${sectionIndex}-${pattern}`}
            className="relative h-screen w-full overflow-hidden px-3 md:px-6"
          >
            {items.map((item) => (
              <GalleryCard
                key={`${sectionIndex}-${item.id}`}
                image={item.image}
                title={item.title}
                description={item.description}
                position={item.position}
                size={item.size}
                zIndex={item.zIndex}
                floatDelay={item.floatDelay + sectionIndex * 0.12}
                rotation={item.rotation ?? 0}
                mousePosition={mousePosition}
                onOpenModal={handleOpenModal}
              />
            ))}
          </section>
        );
      })}

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