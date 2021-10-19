import { useRef, useState, useCallback, useEffect } from 'react';

function useIntersectionObserver(target) {
  const [visible, setVisible] = useState(false);
  const observer = useRef(null);

  const handleIntersection = useCallback((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.current.unobserve(entry.target);
      }
    });
  }, []);

  useEffect(() => {
    const elem = target.current;

    observer.current = new IntersectionObserver(handleIntersection);
    observer.current.observe(elem);

    return () => {
      observer.current.disconnect();
    };
  }, [handleIntersection, target]);

  return {
    visible,
  };
}

export default useIntersectionObserver;
