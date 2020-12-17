import React from "react";
import styles from "./ContentWrapper.module.css";

export default function ContentWrapper({ children }) {
  return <div className={styles.ContentWrapper}>{children}</div>;
}
