import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'motion/react';

export function MusicPlayer() {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Auto-play on mount (with mock audio)
    if (audioRef.current) {
      audioRef.current.volume = volume;
      // audioRef.current.play().catch(() => {}); // Commented out since no actual audio
    }
  }, [volume]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-30"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-3 flex items-center gap-3">
        <button
          onClick={toggleMute}
          className="text-white/80 hover:text-white transition-colors"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
        
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ 
            width: isHovered ? 'auto' : 0,
            opacity: isHovered ? 1 : 0
          }}
          className="overflow-hidden"
        >
          <div className="flex items-center gap-3 pr-2">
            <span className="text-white/70 text-sm whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
              Atmosphere
            </span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
            />
          </div>
        </motion.div>
      </div>
      {/* Mock audio element */}
      <audio ref={audioRef} loop>
        {/* In production, add actual audio source here */}
      </audio>
    </motion.div>
  );
}
