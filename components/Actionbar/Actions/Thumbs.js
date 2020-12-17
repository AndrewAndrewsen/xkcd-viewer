import React, { useEffect, useState } from "react";

import Icon from "../../Icon/Icon.js";

export default function Thumbs({ ThumbsUp, onVote, votes, userVote }) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    setActive(
      (ThumbsUp && userVote?.vote == "up") ||
        (!ThumbsUp && userVote?.vote == "down")
    );
  }, [userVote]);
  return (
    <div onClick={() => onVote(ThumbsUp)}>
      {ThumbsUp ? (
        <Icon type="ThumbsUp" filled={active} />
      ) : (
        <Icon type="ThumbsDown" filled={active} />
      )}
      {votes}
    </div>
  );
}
