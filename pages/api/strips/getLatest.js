import { updateLocalDB, dbGetStripVotes } from "../../../util/db.js";
import { getImageUrl } from "../apiUtils.js";

export default async (req, res) => {
  const strip = await fetch("https://xkcd.com/info.0.json")
    .then((response) => response.json())
    .then((data) => {
      return data;
    });

  updateLocalDB(strip);

  strip.votes = dbGetStripVotes(strip.num);

  strip.img = getImageUrl(strip);
  res.status(200).json(strip);
};
