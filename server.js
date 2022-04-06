const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("./socket");
const { v4: uuid } = require("uuid");

//setting view engine!
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect(`/${uuid()}`);
});

app.get("/:roomID", (req, res) => {
  res.render("room", {
    roomID: req.params.roomID,
  });
});

io.init(server);

server.listen(3000, () => {
  console.log("App is UP");
});
