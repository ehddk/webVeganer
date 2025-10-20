import { useEffect, useState } from "react";

type RestaurantImageProps = {
  src?: string;
  alt: string;
};

export const RestaurantImage = (props: RestaurantImageProps) => {
  const { src, alt } = props;
  const finalSrc = src || "/defaultBanner.jpg";

  return (
    <img
      src={finalSrc}
      alt={alt}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        borderRadius: "8px",
      }}
    />
  );
};
