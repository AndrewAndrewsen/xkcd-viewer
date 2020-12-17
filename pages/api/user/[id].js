import { dbGetUserVotes } from "../../../util/db.js";

export default async (req, res) => {
  const activity = await dbGetUserVotes(req.query.id);

  res.status(200).json(activity);
};
