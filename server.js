const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const fs = require("fs");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// fetchImages()
// This is a copy/paste version of the same function in "db.js".
// The reason for this is because I chose to do a custom node-server that would
// initially populate the database and download the strips for faster lodaingtimes
// and this node-server doesn't want to share the code with "next-reactish" code.
const fetchImage = async (url, name) => {
  const localFilePath = process.env.LOCAL_STRIP_PATH + name + ".png";
  if (fs.existsSync(localFilePath)) {
    return localFilePath;
  }
  const response = await fetch(url);
  const buffer = await response.buffer();

  fs.writeFile(localFilePath, buffer, () => {
    console.log("Download complete!");
  });
};

const fillDatabase = async () => {
  const strip = await fetch("https://xkcd.com/info.0.json")
    .then((response) => response.json())
    .then((data) => {
      return data;
    });

  const latestStripNum = strip.num;
  for (let i = 1; i < latestStripNum; i++) {
    if (i == 404) continue; // XKCD is a jokster

    const strip = await fetch(`https://xkcd.com/${i}/info.0.json`)
      .then((response) => response.json())
      .then((data) => {
        return data;
      });

    fetchImage(strip.img, strip.num);
  }
};

app.prepare().then(() => {
  // Initially get all strips and add to database;
  fillDatabase();

  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
