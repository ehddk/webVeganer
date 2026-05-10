"use client";

import React from "react";

type UseIntersectionVisibleOptions = {
  threshold?: number | number[]; //관측대상이 관측 영역에 얼마나 들어와야하는지를 나타낸 값.
  root?: Element | Document | null; //관측 영역의 루트 요소를 지정. 기본값은 브라우저 뷰포트.
  rootMargin?: string; //해당 관측대상 기준으로 미리 감지할 수 있는 여백의 크기.
  shouldResetOnExit?: boolean; //관측 대상이 관측 영역에서 벗어났을 때 isVisible 상태를 false로 리셋할지 여부. 기본값은 false.
};

const useIntersectionVisible = <TElement extends HTMLElement>(
  options?: UseIntersectionVisibleOptions
) => {
  const targetRef = React.useRef<TElement | null>(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const shouldResetOnExit = options?.shouldResetOnExit ?? false;

  React.useEffect(() => {
    const element = targetRef.current;
    if (element === null) {
      return;
    }

    if (
      typeof window === "undefined" ||
      typeof IntersectionObserver === "undefined"
    ) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (!shouldResetOnExit) {
              observer.unobserve(entry.target);
            }
          } else if (shouldResetOnExit) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: options?.threshold ?? 0,
        root: options?.root ?? null,
        rootMargin: options?.rootMargin ?? "0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [
    options?.root,
    options?.rootMargin,
    options?.threshold,
    shouldResetOnExit,
  ]);

  return {
    ref: targetRef,
    isVisible,
  };
};

export default useIntersectionVisible;
