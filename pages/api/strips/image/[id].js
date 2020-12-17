const fs = require("fs");

export default (req, res) => {
  if (!fs.existsSync(process.env.LOCAL_STRIP_PATH + req.query.id + ".png"))
    res.status(404);

  const stream = fs.createReadStream(
    process.env.LOCAL_STRIP_PATH + req.query.id + ".png"
  );
  res.setHeader("Content-Type", "image/png");

  stream.pipe(res);
};
