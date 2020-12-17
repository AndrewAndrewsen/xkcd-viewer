import React from "react";
import Link from "next/link";

import Dice from "./Icons/dice.svg";
import Save from "./Icons/save.svg";
import Search from "./Icons/search.svg";
import Share from "./Icons/share.svg";
import ThumbsUp from "./Icons/thumbs_up.svg";
import ThumbsDown from "./Icons/thumbs_down.svg";

import styles from "./Icon.module.css";

export default function Icon({ type, href, filled = false }) {
  const Icons = {
    Random: { src: Dice, alt: "Random Icon" },
    Browse: { src: Search, alt: "Browse Icon" },
    Favorites: { src: Save, alt: "Favorite Icon" },
    ThumbsUp: { src: ThumbsUp, alt: "Thumbs Up" },
    ThumbsDown: { src: ThumbsDown, alt: "Thumbs Down" },
    Share: { src: Share, alt: "Share" },
  };

  if (href) {
    return (
      <div
        className={`${styles.Icon} ${styles.link} ${filled && styles.filled}`}
      >
        <Link href={href}>
          <img src={Icons[type]?.src} alt={Icons[type]?.alt} />
        </Link>
      </div>
    );
  } else {
    return (
      <div className={`${styles.Icon} ${filled && styles.filled}`}>
        <img src={Icons[type]?.src} alt={Icons[type]?.alt} />
      </div>
    );
  }
}
