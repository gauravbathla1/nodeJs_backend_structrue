const express = require("express");
const app = express();

const path = require("path");
console.log(__dirname);
app.use("/admin", express.static(path.join(__dirname, "./dist/spiinpiin-web")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./dist/spiinpiin-web/index.html"));
// });
const port = 6000;
app.listen(port, () => {
  console.log("Listening on port", port);
});