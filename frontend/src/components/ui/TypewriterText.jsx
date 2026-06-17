import { useState, useEffect, useRef } from "react";
import { useInView } from "motion/react";

export const TypewriterText = ({ text, delay = 0, className = "" }) => {
  const [displayText, setDisplayText] = useState("");
  const [startTyping, setStartTyping] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && !startTyping) {
      setStartTyping(true);
    }
  }, [isInView, startTyping]);

  useEffect(() => {
    if (startTyping) {
      let i = 0;
      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          setDisplayText(text.slice(0, i + 1));
          i++;
          if (i >= text.length) clearInterval(interval);
        }, 50);
        return () => clearInterval(interval);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [startTyping, text, delay]);

  return <p ref={ref} className={className}>{displayText}</p>;
};