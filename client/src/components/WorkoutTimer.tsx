import { useEffect, useMemo, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react";

function formatSeconds(total: number) {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function WorkoutTimer(props: { presetsSeconds?: number[]; compact?: boolean }) {
  const presets = useMemo(() => props.presetsSeconds ?? [30, 45, 60, 90], [props.presetsSeconds]);
  const [duration, setDuration] = useState<number>(presets[0] ?? 60);
  const [remaining, setRemaining] = useState<number>(duration);
  const [running, setRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const playSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch {
    }
  }, [soundEnabled]);

  useEffect(() => {
    setRemaining(duration);
    setRunning(false);
  }, [duration]);

  useEffect(() => {
    if (!running) return;
    if (remaining <= 0) {
      setRunning(false);
      playSound();
      return;
    }
    const id = window.setInterval(() => {
      setRemaining((r) => Math.max(0, r - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [running, remaining, playSound]);

  const percent = duration ? Math.round(((duration - remaining) / duration) * 100) : 0;
  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  if (props.compact) {
    return (
      <div className="glass-card rounded-2xl p-4">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
              <circle cx="80" cy="80" r="70" fill="none" stroke="hsl(var(--muted))" strokeWidth="6" />
              <circle
                cx="80" cy="80" r="70"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-300 ease-linear"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-semibold tabular-nums">{formatSeconds(remaining)}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {presets.map((sec) => (
              <Button
                key={sec}
                type="button"
                variant={sec === duration ? "default" : "outline"}
                size="sm"
                className="rounded-lg h-7 px-2 text-xs"
                onClick={() => setDuration(sec)}
              >
                {sec}s
              </Button>
            ))}
          </div>
          <div className="flex gap-1.5 ml-auto">
            <Button
              size="sm"
              className="rounded-lg h-8 w-8 p-0"
              onClick={() => setRunning((r) => !r)}
              disabled={remaining === 0 && !running}
            >
              {running ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 ml-0.5" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-lg h-8 w-8 p-0"
              onClick={() => { setRemaining(duration); setRunning(false); }}
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="text-center space-y-6">
        <div className="relative w-44 h-44 mx-auto">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
            <circle cx="80" cy="80" r="70" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
            <circle
              cx="80" cy="80" r="70"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-300 ease-linear"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="timer-display text-4xl font-semibold text-foreground">{formatSeconds(remaining)}</span>
          </div>
        </div>

        <div className="flex justify-center gap-2">
          {presets.map((sec) => (
            <Button
              key={sec}
              type="button"
              variant={sec === duration ? "default" : "outline"}
              size="sm"
              className="rounded-xl min-w-[3.5rem]"
              onClick={() => setDuration(sec)}
            >
              {sec}s
            </Button>
          ))}
        </div>

        <div className="flex justify-center items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => { setRemaining(duration); setRunning(false); }}
            className="rounded-xl w-11 h-11"
          >
            <RotateCcw className="w-5 h-5" />
          </Button>
          
          <Button
            size="lg"
            onClick={() => setRunning((r) => !r)}
            disabled={remaining === 0 && !running}
            className="rounded-xl w-16 h-12"
          >
            {running ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="rounded-xl w-11 h-11"
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          {running ? "Timer running..." : remaining === 0 ? "Time's up!" : "Tap play to start"}
        </p>
      </div>
    </div>
  );
}
