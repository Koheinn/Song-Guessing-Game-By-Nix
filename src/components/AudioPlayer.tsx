import { useState, useEffect, useRef } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface AudioPlayerProps {
  url: string;
  autoPlay?: boolean;
  forcePause?: boolean;
}

const PREVIEW_DURATION = 30; // Limit to 30 second preview

export function AudioPlayer({ url, autoPlay = true, forcePause = false }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // Reset state on URL change
  useEffect(() => {
    setIsReady(false);
    setCurrentTime(0);
    setIsPlaying(false);
  }, [url]);

  // AutoPlay logic
  useEffect(() => {
    if (autoPlay && isReady && !forcePause) {
      audioRef.current?.play().catch(e => {
        console.log("Autoplay prevented or interrupted:", e.message || String(e));
      });
    }
  }, [autoPlay, isReady, url, forcePause]);

  useEffect(() => {
    if (forcePause && isPlaying) {
      audioRef.current?.pause();
    }
  }, [forcePause, isPlaying]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log(e.message || String(e)));
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      // Auto-stop at PREVIEW_DURATION
      if (audioRef.current.currentTime >= PREVIEW_DURATION) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={togglePlay}
          className={`flex items-center justify-center text-white rounded-xl w-10 h-10 transition-colors active:scale-95 flex-shrink-0 shadow-lg shadow-blue-500/20 ${!isReady ? 'bg-gray-600 bg-opacity-50' : 'bg-blue-500 hover:bg-blue-400'}`}
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

      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-gray-400 font-mono w-8 text-right">
            {formatTime(currentTime)}
          </span>
          <div className="flex-1 relative flex items-center h-4 group">
            <input
              type="range"
              min={0}
              max={PREVIEW_DURATION}
              value={currentTime}
              onChange={handleSeek}
              disabled={!isReady}
              className="absolute w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                style={{ width: `${(currentTime / PREVIEW_DURATION) * 100}%` }}
              />
            </div>
          </div>
          <span className="text-[10px] text-gray-400 font-mono w-8">
            {formatTime(PREVIEW_DURATION)}
          </span>
        </div>
        <div className="flex justify-center text-[10px] uppercase font-mono tracking-widest text-blue-400 h-4">
          {!isReady ? "LOADING..." : isPlaying ? "PLAYING PREVIEW..." : "PAUSED"}
        </div>
      </div>

      <audio
        ref={audioRef}
        src={url}
        onCanPlay={() => setIsReady(true)}
        onTimeUpdate={handleTimeUpdate}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onEnded={() => setIsPlaying(false)}
        onError={(e) => {
          console.error("Audio Error:", e.currentTarget.error?.message || "Unknown error");
          setIsReady(true);
        }}
        preload="auto"
        className="hidden"
      />
    </div>
  );
}

