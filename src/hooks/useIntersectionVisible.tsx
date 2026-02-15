import React from "react";

type UseIntersectionVisibleOptions = {
  thershold?: number | number[]; // 관측대상이 관측 영역에 얼마나 들어와야 하는지를 나타내는 값.
  root?: Element | null;
  rootMargin?: string; //해당 관측대상 기준으로 미리 감지할 수 있는 여백의 크기
};

export default function useInfinityScroll(
  callback: () => void,
  isLoading: boolean,
  isLastPage: boolean
  //options: UseIntersectionVisibleOptions
) {
  const observerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(
        (entry) => {
          if (entries[0].isIntersecting) {
            callback();
          }
        },
        { threshold: 0.6 }
      );
      const currentObserver = observerRef.current;
      if (currentObserver) {
        observer.observe(currentObserver);
      }
      return () => {
        if (currentObserver) {
          observer.unobserve(currentObserver);
        }
      };
    });
  }, [isLoading, isLastPage, callback]);

  return observerRef;
}
