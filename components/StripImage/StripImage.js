import React from "react";
import styles from "./StripImage.module.css";

export default function StripImage({ mode = "adapt", img, alt = "Image" }) {
  const sizes = {
    adapt: styles.adapt,
  };

  return (
    <img
      className={`${styles.stripImage} ${sizes[mode]}`}
      src={img}
      alt={alt}
    />
  );
}
