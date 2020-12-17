import React, { useEffect } from "react";
import styles from "./Toaster.module.css";

export default function Toaster({ text, setToasterActive }) {
  useEffect(() => {
    setTimeout(() => {
      setToasterActive(false);
    }, 5000);
  }, [setToasterActive]);

  return <div className={`${styles.Toaster}`}>{text}</div>;
}
