import React from "react";
import styles from "./Menu.module.css";

import Icon from "../../components/Icon/Icon.js";

export default function Menu() {
  const MenuItems = [
    { id: 0, icon: "Random", href: "/" },
    { id: 1, icon: "Browse", href: "/browse" },
    { id: 2, icon: "Favorites", href: "/favorites" },
  ];

  return (
    <div className={styles.Menu}>
      {MenuItems.map((item) => (
        <div className={styles.menuItem} key={item.id}>
          <Icon type={item.icon} href={item.href} filled={true} />
        </div>
      ))}
    </div>
  );
}
