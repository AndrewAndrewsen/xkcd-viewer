import React from "react";

import Actionbar from "../../components/Actionbar/Actionbar.js";

import styles from "./MiniatureStrip.module.css";

export default function MiniatureStrip({ strip, small = false }) {
  return (
    <div className={`${styles.MiniatureStrip} ${small && styles.small}`}>
      <div className={styles.stripData}>
        <div>
          <h2>
            #
            <a href={`${process.env.NEXT_PUBLIC_SITE_URL}${strip?.num}/`}>
              {strip?.num}
            </a>{" "}
            {strip?.safe_title}
          </h2>

          <div className={styles.imageContainer}>
            <img
              className={styles.stripImage}
              src={strip?.img}
              alt={strip?.alt}
            />
          </div>
        </div>
        <div>
          <Actionbar strip={strip} mini={true} />
        </div>
      </div>
    </div>
  );
}
