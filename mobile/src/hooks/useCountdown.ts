import { useState, useEffect } from 'react';

export interface CountdownResult {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  isFinished: boolean;
  totalSeconds: number;
}

export const useCountdown = (targetDate?: string | Date, onFinished?: () => void): CountdownResult => {
  const calculateTimeRemaining = (): CountdownResult => {
    if (!targetDate) {
      return { days: '00', hours: '00', minutes: '00', seconds: '00', isFinished: true, totalSeconds: 0 };
    }

    const target = new Date(targetDate).getTime();
    const now = Date.now();
    const diff = target - now;

    if (diff <= 0) {
      return { days: '00', hours: '00', minutes: '00', seconds: '00', isFinished: true, totalSeconds: 0 };
    }

    const totalSeconds = Math.floor(diff / 1000);
    const d = Math.floor(totalSeconds / (3600 * 24));
    const h = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    return {
      days: String(d).padStart(2, '0'),
      hours: String(h).padStart(2, '0'),
      minutes: String(m).padStart(2, '0'),
      seconds: String(s).padStart(2, '0'),
      isFinished: false,
      totalSeconds
    };
  };

  const [timeLeft, setTimeLeft] = useState<CountdownResult>(calculateTimeRemaining());

  useEffect(() => {
    setTimeLeft(calculateTimeRemaining());

    const interval = setInterval(() => {
      const updated = calculateTimeRemaining();
      setTimeLeft(updated);

      if (updated.isFinished && onFinished) {
        onFinished();
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
};
