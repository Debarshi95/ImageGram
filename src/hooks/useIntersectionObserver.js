import { useRef, useState, useCallback, useEffect } from 'react';

function useIntersectionObserver(target) {
  const [visible, setVisible] = useState(false);
  const observer = useRef(null);

  const handleIntersection = useCallback((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        observer.current.unobserve(entry.target);
        setVisible(true);
      }
    });
  }, []);

  useEffect(() => {
    if (target?.current) {
      const elem = target.current;

      observer.current = new IntersectionObserver(handleIntersection, { threshold: 0.2 });
      observer.current.observe(elem);
    }

    return () => {
      observer.current?.disconnect();
    };
  }, [handleIntersection, target]);

  return {
    visible,
  };
}

export default useIntersectionObserver;
