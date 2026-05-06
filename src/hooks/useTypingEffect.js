import { useState, useEffect, useRef } from 'react';

export function useTypingEffect(texts, options = {}) {
  const { typingSpeed = 80, deletingSpeed = 50, pauseDuration = 2000 } = options;
  const [displayText, setDisplayText] = useState('');
  const textIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const textsArray = Array.isArray(texts) ? texts : [texts];

    function typeEffect() {
      const currentText = textsArray[textIndexRef.current];

      if (!isDeletingRef.current) {
        charIndexRef.current++;
        setDisplayText(currentText.substring(0, charIndexRef.current));

        if (charIndexRef.current === currentText.length) {
          timeoutRef.current = setTimeout(() => {
            isDeletingRef.current = true;
            typeEffect();
          }, pauseDuration);
          return;
        }
      } else {
        charIndexRef.current--;
        setDisplayText(currentText.substring(0, charIndexRef.current));

        if (charIndexRef.current === 0) {
          isDeletingRef.current = false;
          textIndexRef.current = (textIndexRef.current + 1) % textsArray.length;
        }
      }

      const speed = isDeletingRef.current ? deletingSpeed : typingSpeed;
      timeoutRef.current = setTimeout(typeEffect, speed);
    }

    typeEffect();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return displayText;
}
