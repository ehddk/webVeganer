import React from "react";

const useIsMobile = (pointBreak: number = 1200) => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${pointBreak}px)`);

    const handleResize = () => {
      setIsMobile(mediaQuery.matches);
    };
    mediaQuery.addEventListener("change", handleResize);
    handleResize();
    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, [pointBreak]);
  return isMobile;
};

export default useIsMobile;
