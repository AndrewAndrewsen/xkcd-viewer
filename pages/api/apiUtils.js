const fs = require("fs");

export default (req, res) => {
  res.status(403).end();
};

export const getImageUrl = (strip) => {
  if (fs.existsSync(process.env.LOCAL_STRIP_PATH + strip.num + ".png")) {
    return process.env.NEXT_PUBLIC_SITE_URL + "api/strips/image/" + strip.num;
  }

  // Use remote image as fallback
  return strip.img;
};
