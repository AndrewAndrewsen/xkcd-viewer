import React from "react";

import Actionbar from "../../components/Actionbar/Actionbar.js";
import Spacer from "../../components/Spacer/Spacer.js";
import StripImage from "../../components/StripImage/StripImage.js";

import styles from "./DisplayStrip.module.css";

export default function DisplayStrip({ strip, small = false }) {
  return (
    <div className={`${styles.DisplayStrip} ${small && styles.small}`}>
      <div className={styles.stripData}>
        <h2>
          #
          <a href={`${process.env.NEXT_PUBLIC_SITE_URL}${strip?.num}/`}>
            {strip?.num}
          </a>{" "}
          {strip?.safe_title}
        </h2>
        <h3>Posted: {`${strip?.day}-${strip?.month}-${strip?.year}`}</h3>
        <Spacer size="small" />

        <StripImage size="adapt" img={strip?.img} alt={strip?.alt} />
        <Spacer size="small" />

        <Actionbar strip={strip} />
      </div>
    </div>
  );
}
