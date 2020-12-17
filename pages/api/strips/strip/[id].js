import { updateLocalDB } from "../../../../util/db.js";
import { getImageUrl } from "../../apiUtils.js";

export default async (req, res) => {
  const strip = await getStrip(req.query.id);
  
  res.status(200).json(strip);
};


export const getStrip = async (id) => {
   const strip = await fetch(`https://xkcd.com/${id}/info.0.json`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });

    updateLocalDB(strip);
  
    strip.img = getImageUrl(strip);

    return strip;
  };
  