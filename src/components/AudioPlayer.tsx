import { useState, useEffect, useRef } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface AudioPlayerProps {
  url: string;
  autoPlay?: boolean;
}

export function AudioPlayer({ url, autoPlay = true }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // Starts at 50% volume
      if (autoPlay) {
        audioRef.current.play().catch(() => {
          // Browser may block auto-play; update state if blocked
          setIsPlaying(false);
        });
      }
    }
  }, [url, autoPlay]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // When audio finishes playing (previews are usually 30s)
  const handleEnded = () => setIsPlaying(false);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={togglePlay}
          className="flex items-center justify-center bg-blue-500 hover:bg-blue-400 text-white rounded-xl w-10 h-10 transition-colors active:scale-95 flex-shrink-0 shadow-lg shadow-blue-500/20"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-current" />
          ) : (
            <Play className="w-4 h-4 fill-current ml-1" />
          )}
        </button>
        <button
          onClick={toggleMute}
          className="text-gray-400 hover:text-white transition-colors w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/10"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </button>
      </div>

      <div className="space-y-3">
        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden relative">
          <div className={`h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full ${isPlaying ? "w-full transition-[width] duration-[30000ms] ease-linear origin-left" : "w-0"}`} style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}></div>
        </div>
        <div className="flex justify-center text-[10px] uppercase font-mono tracking-widest text-blue-400">
          {isPlaying ? "PLAYING PREVIEW..." : "PAUSED"}
        </div>
      </div>

      <audio
        ref={audioRef}
        src={url}
        onEnded={handleEnded}
        className="hidden"
      />
    </div>
  );
}
