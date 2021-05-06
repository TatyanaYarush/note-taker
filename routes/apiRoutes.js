const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    let data = fs.readFileSync(path.join(__dirname, `../db/db.json`), "utf8");
    res.json(JSON.parse(data));
  });

  app.post("/api/notes", function (req, res) {
    //  console.log(req.body)
    let data = JSON.parse(
      fs.readFileSync(path.join(__dirname, `../db/db.json`), "utf8")
    );
    // console.log(data)
    req.body["id"] = uuidv4();
    data.push(req.body);
    // console.log(data)

    fs.writeFileSync(
      path.join(__dirname, `../db/db.json`),
      JSON.stringify(data)
    );
    res.send("Susses wrote the notes");
  });

  app.delete("/api/notes/:id", function (req, res) {
    let data = JSON.parse(
      fs.readFileSync(path.join(__dirname, `../db/db.json`), "utf8")
    );
    // console.log(data);
   let filltered = data.filter(function(note) {
       return note.id !== req.params.id
   })

    fs.writeFileSync(
      path.join(__dirname, `../db/db.json`),
      JSON.stringify(filltered)

    );
    res.status(204).send();
  });
};

