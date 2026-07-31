import { useRef, useState, useEffect, useCallback } from 'react';

interface AudioControls {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  isLoaded: boolean;
  hasError: boolean;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  mute: () => void;
  changeVolume: (v: number) => void;
  fadeIn: (duration?: number) => void;
  fadeOut: (duration?: number) => void;
}

export function useAudio(src: string): AudioControls {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeTimerRef = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.35);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!src) return;
    const audio = new Audio();
    audio.loop = true;
    audio.volume = volume;
    audio.preload = 'none';

    const onCanPlay = () => {
      setIsLoaded(true);
      setHasError(false);
    };
    const onError = () => {
      setIsLoaded(false);
      setHasError(true);
    };
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener('canplaythrough', onCanPlay);
    audio.addEventListener('error', onError);
    audio.addEventListener('ended', onEnded);

    // For WebM: check browser support and warn gracefully if unsupported (e.g. Safari)
    if (src.endsWith('.webm')) {
      const support = audio.canPlayType('audio/webm; codecs="opus"') ||
                      audio.canPlayType('audio/webm');
      if (support === '') {
        // Browser can't play WebM — mark as error so UI shows graceful fallback
        setHasError(true);
        return;
      }
    }

    audio.src = src;

    audioRef.current = audio;

    return () => {
      audio.removeEventListener('canplaythrough', onCanPlay);
      audio.removeEventListener('error', onError);
      audio.removeEventListener('ended', onEnded);
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.play().then(() => setIsPlaying(true)).catch(() => {});
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    isPlaying ? pause() : play();
  }, [isPlaying, play, pause]);

  const mute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(prev => !prev);
  }, [isMuted]);

  const changeVolume = useCallback((v: number) => {
    const clamped = Math.max(0, Math.min(1, v));
    setVolume(clamped);
    if (audioRef.current) audioRef.current.volume = clamped;
  }, []);

  const fadeIn = useCallback((duration = 2000) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (fadeTimerRef.current) clearInterval(fadeTimerRef.current);
    audio.volume = 0;
    audio.play().then(() => setIsPlaying(true)).catch(() => {});
    const target = volume;
    const steps = 30;
    const step = target / steps;
    let current = 0;
    fadeTimerRef.current = setInterval(() => {
      current += step;
      if (current >= target) {
        audio.volume = target;
        if (fadeTimerRef.current) clearInterval(fadeTimerRef.current);
      } else {
        audio.volume = current;
      }
    }, duration / steps) as unknown as number;
  }, [volume]);

  const fadeOut = useCallback((duration = 2000) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (fadeTimerRef.current) clearInterval(fadeTimerRef.current);
    const start = audio.volume;
    const steps = 30;
    const step = start / steps;
    let current = start;
    fadeTimerRef.current = setInterval(() => {
      current -= step;
      if (current <= 0) {
        audio.volume = 0;
        audio.pause();
        setIsPlaying(false);
        if (fadeTimerRef.current) clearInterval(fadeTimerRef.current);
      } else {
        audio.volume = current;
      }
    }, duration / steps) as unknown as number;
  }, []);

  return { isPlaying, isMuted, volume, isLoaded, hasError, play, pause, toggle, mute, changeVolume, fadeIn, fadeOut };
}
