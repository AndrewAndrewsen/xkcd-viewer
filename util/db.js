const fs = require("fs");
const db = require("better-sqlite3")(process.env.DB_PATH);

const dbInsertStrip = (strip_IN) => {
  const sql = `INSERT INTO strips (month, num, link, year, news, safe_title, transcript, alt, img, title, day) VALUES(?,?,?,?,?,?,?,?,?,?,?)`;
  const stmt = db.prepare(sql);
  stmt.run(
    strip_IN.month,
    strip_IN.num,
    strip_IN.link,
    strip_IN.year,
    strip_IN.news,
    strip_IN.safe_title,
    strip_IN.transcript,
    strip_IN.alt,
    strip_IN.img,
    strip_IN.title,
    strip_IN.day
  );
};

export const dbRegisterVote = async (strip_num_IN, isUpvote, user_uid_IN) => {
  const vote_IN = isUpvote ? "up" : "down";
  const sql = `UPDATE votes SET obsolete=1 WHERE client=? AND num=?`;
  let stmt = db.prepare(sql);
  stmt.run(user_uid_IN, strip_num_IN);
  stmt = db.prepare(
    `INSERT INTO votes (num, vote, client, obsolete) VALUES(?,?,?,?)`
  );
  stmt.run(strip_num_IN, vote_IN, user_uid_IN, 0);

  return dbGetStripVotes(strip_num_IN);
};

export const dbGetStripVotes = (strip_num_IN) => {
  const votes = { up: 0, down: 0 };

  let stmt = db.prepare(
    `SELECT COUNT(num) as vote FROM votes WHERE num=? AND obsolete=0 AND vote='up'`
  );
  votes.up = stmt.get(strip_num_IN).vote;

  stmt = db.prepare(
    `SELECT COUNT(num) as vote FROM votes WHERE num=? AND obsolete=0 AND vote='down'`
  );
  votes.down = stmt.get(strip_num_IN).vote;

  return votes;
};

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

export const updateLocalDB = (strip) => {
  const sql = `SELECT COUNT(num) as num FROM strips WHERE num=?`;
  const stmt = db.prepare(sql);
  const row = stmt.get(strip.num);

  if (row.num < 1) {
    fetchImage(strip.img, strip.num);
    dbInsertStrip(strip);
  }
};

export const dbGetUserVotes = (user_uid_IN) => {
  let stmt = db.prepare(
    `SELECT num, vote FROM votes WHERE client=? AND obsolete=0`
  );
  const votes = stmt.all(user_uid_IN);

  return votes;
};

export const dbGetLatestStripNum = () => {
  const stmt = db.prepare(`SELECT num FROM strips ORDER BY num DESC LIMIT 1`);
  return stmt.get().num;
};

export const dbGetStripsAll = () => {
  const stmt = db.prepare(
    `SELECT num, link, month, year, news, safe_title, transcript, alt, img, title, day FROM strips ORDER BY num DESC`
  );
  return stmt.all();
};
