import { useEffect, useRef, useState } from 'react';

const RESERVATION_TIME = 5 * 60; // 5 minutes

export function useReservationTimer(isActive: boolean, onExpire: () => void) {
  const [secondsLeft, setSecondsLeft] = useState(RESERVATION_TIME);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive) {
      setSecondsLeft(RESERVATION_TIME);
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else {
      setSecondsLeft(RESERVATION_TIME);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive]);

  useEffect(() => {
    if (secondsLeft === 0 && isActive) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      onExpire();
    }
  }, [secondsLeft, isActive, onExpire]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formatted = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  return { secondsLeft, formatted };
} 