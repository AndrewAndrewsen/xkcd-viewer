import React from "react";

import Favorite from "./Actions/Favorite.js";
import Share from "./Actions/Share.js";
import VoteBox from "./VoteBox.js";


import styles from "./Actionbar.module.css";


export default function Actionbar({ strip, mini = false }) {
  return (
    <div className={styles.Actionbar}>
      <div className={`${styles.iconWrapper} ${mini && styles.vertical}`}>
        <VoteBox strip={strip} />
        <Share title={strip?.title} num={strip?.num} />
        <Favorite num={strip?.num} />
      </div>
    </div>
  );
}
