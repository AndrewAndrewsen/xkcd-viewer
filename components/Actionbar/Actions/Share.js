import React, { useState } from "react";

import Icon from "../../Icon/Icon.js";
import Toaster from "../../Toaster/Toaster.js";

export default function Share({ title, num }) {
  const [isToasterActive, setToasterActive] = useState(false);

  const onShare = async () => {
    if (navigator?.share) {
      navigator.share({
        title: title,
        url: process.env.NEXT_PUBLIC_XKCD_URL + num,
      });
    } else {
      // if navigator is not enables/supported, fallback!
      if (navigator?.clipboard) {
        // The fallback will only work on pc. If this errors on mobile it's probably due to the site lacking SSL.
        navigator.clipboard
          .writeText(`${process.env.NEXT_PUBLIC_XKCD_URL}${num}`)
          .then(function () {
            setToasterActive(true);
          });
      }
    }
  };

  return (
    <div onClick={() => onShare()}>
      {isToasterActive && (
        <Toaster
          text="URL saved to clipboard!"
          setToasterActive={setToasterActive}
        />
      )}
      <Icon type="Share" />
    </div>
  );
}
