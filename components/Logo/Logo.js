import React from "react";
import styles from "./Logo.module.css";
import Link from "next/link";

export default function Logo() {
  return (
    <div className={styles.Logo}>
      <Link href="/">XKCD Viewer</Link>
    </div>
  );
}
