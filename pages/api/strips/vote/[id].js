import { dbRegisterVote } from "../../../../util/db.js";

export default async (req, res) => {
  const votes = await dbRegisterVote(
    req.query.id,
    req.body.isUpvote,
    req.body.user_uid
  );

  res.status(200).json(votes);
};
