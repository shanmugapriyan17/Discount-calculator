
// sanitize-all.js
const fs = require("fs");
const glob = require("glob");

glob.sync("src/**/*.jsx").forEach((path) => {
  let s = fs.readFileSync(path, "utf8");
  if (s.charCodeAt(0) === 0xfeff) s = s.slice(1);
  const match = s.match(/\bimport\s+React\b/);
  if (match && match.index > 0) s = s.slice(match.index);
  fs.writeFileSync(path, s, "utf8");
  console.log("Sanitized", path);
});
