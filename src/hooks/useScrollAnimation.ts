import { useEffect, useRef, useState } from "react";

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  onEnter?: () => void;
  onExit?: () => void;
}

interface UseScrollAnimationReturn {
  ref: (node: Element | null) => void;
  inView: boolean;
  progress: number;
}

export const useScrollAnimation = ({
  threshold = 0.1,
  rootMargin = "0px 0px -50px 0px",
  triggerOnce = true,
  onEnter,
  onExit,
}: UseScrollAnimationOptions = {}): UseScrollAnimationReturn => {
  const [inView, setInView] = useState(false);
  const [progress, setProgress] = useState(0);
  const ref = useRef<Element | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        
        // Update inView state
        if (entry.isIntersecting) {
          setInView(true);
          onEnter?.();
          
          if (triggerOnce) {
            observerRef.current?.unobserve(ref.current!);
          }
        } else {
          setInView(false);
          onExit?.();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observerRef.current.observe(ref.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, onEnter, onExit]);

  // Return a function that sets the ref
  return {
    ref: (node: Element | null) => {
      ref.current = node;
    },
    inView,
    progress,
  };
};

export default useScrollAnimation;