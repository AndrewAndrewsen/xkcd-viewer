import React from "react";

import styles from "./GridWrapper.module.css";

export default function GridWrapper({ children }) {
  return <div className={styles.GridWrapper}>{children}</div>;
}
