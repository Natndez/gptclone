import { useEffect, useState } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number; // speed in milliseconds
}

export const Typewriter: React.FC<TypewriterProps> = ({ text, speed = 50 }) => {
  const [visibleText, setVisibleText] = useState('');
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (charIndex < text.length) {
      const timer = setTimeout(() => {
        setVisibleText((prev) => prev + text[charIndex]);
        setCharIndex(charIndex + 1);
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [text, charIndex, speed]); // Depend on charIndex and speed

  // Reset when the text changes
  useEffect(() => {
    setVisibleText('');
    setCharIndex(0);
  }, [text]);

  return <span>{visibleText}</span>;
};
