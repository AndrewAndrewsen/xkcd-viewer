import React from "react";
import styles from "./Spacer.module.css";

export default function Spacer({ size }) {
  const sizes = {
    smallest: styles.smallest,
    small: styles.small,
    medium: styles.medium,
    large: styles.large,
  };

  return <div className={`${styles.Spacer} ${sizes[size]} `} />;
}
