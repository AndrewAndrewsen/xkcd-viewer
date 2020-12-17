import React from "react";
import styles from "./Center.module.css";

export default function Center({ children }) {
  return <div className={styles.Center}>{children}</div>;
}
