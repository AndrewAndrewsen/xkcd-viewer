import React from "react";

import Logo from "../../components/Logo/Logo.js";
import Menu from "../../components/Menu/Menu.js";

import styles from "./Header.module.css";

export default function Header() {
  return (
    <div className={styles.Header}>
      <div className={styles.wrapper}>
        <Logo />
        <Menu />
      </div>
    </div>
  );
}
