import { dbGetStripsAll } from "../../../util/db.js";
import { getImageUrl } from "../apiUtils.js";

export default async (req, res) => {
  const strips = getAll();
    console.log(strips);

  res.status(200).json(strips);
};

export const getAll = () => {
  const strips = dbGetStripsAll();

  strips.map((strip) => {
    strip.img = getImageUrl(strip);
  });

  return strips;
};
