import { useState, useCallback, useRef } from 'react';

interface MousePoint {
  x: number;
  y: number;
  t: number;
}

const MIN_PATH_LENGTH = 10;
const MIN_DISTANCE = 30;
const MIN_DURATION_MS = 200;
const MAX_VELOCITY = 5; // pixels per millisecond

export const useHumanCheck = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mousePath = useRef<MousePoint[]>([]);

  const clearPath = useCallback(() => {
    mousePath.current = [];
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (isVerifying || isVerified) return;
    mousePath.current.push({ x: e.clientX, y: e.clientY, t: Date.now() });
  }, [isVerifying, isVerified]);

  const reset = useCallback(() => {
    setIsVerified(false);
    setIsVerifying(false);
    setError(null);
    mousePath.current = [];
  }, []);

  const verify = useCallback(() => {
    setError(null);
    setIsVerifying(true);

    const path = mousePath.current;
    
    // Simulate a verification delay
    setTimeout(() => {
      // Rule 1: Must have a minimum number of recorded mouse points.
      if (path.length < MIN_PATH_LENGTH) {
        setError('Suspicious activity detected. Please try again.');
        setIsVerifying(false);
        return;
      }

      // Rule 2: Must have a minimum duration.
      const duration = path[path.length - 1].t - path[0].t;
      if (duration < MIN_DURATION_MS) {
        setError('Interaction too fast. Please try again.');
        setIsVerifying(false);
        return;
      }

      // Rule 3: Must travel a minimum distance.
      let distance = 0;
      for (let i = 1; i < path.length; i++) {
        distance += Math.hypot(path[i].x - path[i-1].x, path[i].y - path[i-1].y);
      }
      if (distance < MIN_DISTANCE) {
        setError('Please move the mouse more naturally.');
        setIsVerifying(false);
        return;
      }

      // Rule 4: Velocity checks (bots often have unnaturally high or constant velocity).
      for (let i = 1; i < path.length; i++) {
        const d = Math.hypot(path[i].x - path[i-1].x, path[i].y - path[i-1].y);
        const t = path[i].t - path[i-1].t;
        if (t > 0 && d / t > MAX_VELOCITY) {
          setError('Irregular movement detected. Please try again.');
          setIsVerifying(false);
          return;
        }
      }

      // If all checks pass
      setIsVerified(true);
      setIsVerifying(false);
      mousePath.current = [];
    }, 1000); // Simulate network latency for verification
  }, []);

  return { isVerified, isVerifying, error, handleMouseMove, verify, reset, clearPath };
};