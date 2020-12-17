import React, { useEffect, useState } from "react";

import { api } from "../../util/api.js";
import { getUserUid, getUserVote } from "../../util/user.js";

import Thumbs from "./Actions/Thumbs.js";

export default function VoteBox({ strip }) {
  const [votes, setVotes] = useState(strip?.votes);
  const [userVote, setUserVote] = useState();

  useEffect(async () => {
    setUserVote(await getUserVote(strip?.num));
  }, []);

  const vote = async (ThumbsUp) => {
    setVotes(
      await api("strips/vote/" + strip.num, {
        isUpvote: ThumbsUp,
        user_uid: getUserUid(),
      }, true)
    );
    setUserVote(await getUserVote(strip?.num));
  };

  return (
    <>
      <Thumbs
        ThumbsUp={true}
        strip={strip}
        onVote={vote}
        votes={votes?.up}
        userVote={userVote}
      />{" "}
      <Thumbs
        ThumbsUp={false}
        strip={strip}
        onVote={vote}
        votes={votes?.down}
        userVote={userVote}
      />
    </>
  );
}
