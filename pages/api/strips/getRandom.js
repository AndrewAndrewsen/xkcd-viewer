import {
  updateLocalDB,
  dbGetStripVotes,
  dbGetLatestStripNum,
} from "../../../util/db.js";
import { getImageUrl } from "../apiUtils.js";

export default async (req, res) => {
  const strip = await getRandom();
  res.status(200).json(strip);
};


export const getRandom = async () => {
    const latestStripNum = await dbGetLatestStripNum();
    let randomNum = Math.floor(Math.random() * latestStripNum) + 1; // 1 to latest num
  
    if (randomNum == 404) randomNum++; // Strip 404 does not exist.
  
    const strip = await fetch(`https://xkcd.com/${randomNum}/info.0.json`)
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  
    updateLocalDB(strip);
    strip.votes = dbGetStripVotes(strip.num);
    strip.img = getImageUrl(strip);

    return strip;
}