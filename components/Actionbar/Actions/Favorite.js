import React, { useState } from "react";

import Icon from "../../Icon/Icon.js";

import { addToFavorites, getUserFavorites } from "../../../util/user.js";

export default function Favorite({ num }) {
  const [favorites, setFavorites] = useState([]);

  const saveStrip = (num) => {
    setFavorites(addToFavorites(num));
  };

  useState(() => {
    setFavorites(getUserFavorites());
  }, [favorites]);

  return (
    <div
      onClick={() => {
        saveStrip(num);
      }}
    >
      <Icon
        type="Favorites"
        filled={favorites?.filter((strip) => strip.num === num).length > 0}
      />
    </div>
  );
}
