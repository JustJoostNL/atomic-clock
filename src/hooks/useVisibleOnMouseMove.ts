import { useEffect, useRef, useState } from "react";

export function useVisibleOnMouseMove(time: number) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleMouseMove = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setVisible(true);
      timeoutRef.current = setTimeout(() => setVisible(false), time);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [time]);

  return visible;
}
