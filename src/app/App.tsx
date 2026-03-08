import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { IntroScreen } from './components/IntroScreen';
import { Gallery } from './components/Gallery';
import { GlassButton } from './components/GlassButton';
import { MainModal } from './components/MainModal';
import { MusicPlayer } from './components/MusicPlayer';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [showMainModal, setShowMainModal] = useState(false);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  const handleOpenMainModal = () => {
    setShowMainModal(true);
  };

  const handleCloseMainModal = () => {
    setShowMainModal(false);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Film grain and vignette overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-10"
        style={{
          backgroundImage: `
            radial-gradient(circle, transparent 60%, rgba(0,0,0,0.7) 100%),
            url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")
          `,
          backgroundBlendMode: 'overlay',
        }}
      />

      <AnimatePresence mode="wait">
        {showIntro && (
          <IntroScreen key="intro" onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      {!showIntro && (
        <>
          <GlassButton onClick={handleOpenMainModal} />
          <Gallery />
          <MusicPlayer />
          <MainModal isOpen={showMainModal} onClose={handleCloseMainModal} />
        </>
      )}
    </div>
  );
}
