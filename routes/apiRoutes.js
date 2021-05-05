const fs = require("fs");
const path = require("path");

module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    let data = fs.readFileSync(path.join(__dirname, `../db/db.json`), "utf8");
    res.json(JSON.parse(data));
  });


  app.post("/api/notes", function (req, res) {
    //  console.log(req.body)
    let data = JSON.parse(fs.readFileSync(path.join(__dirname, `../db/db.json`), "utf8")); 
    // console.log(data)

    data.push(req.body)
    // console.log(data)

    fs.writeFileSync(path.join(__dirname, `../db/db.json`), JSON.stringify(data))
    res.send("Susses wrote the notes")
  });

  app.delete('/api/notes/:id', function(req, res) {
     let data = JSON.parse(fs.readFileSync(path.join(__dirname, `../db/db.json`), "utf8"));
     delete data[req.params.id];
        // console.log(data);
    //  data.delete(req.body)

    fs.writeFileSync(path.join(__dirname, `../db/db.json`), JSON.stringify(data));
    res.status(204).send();
    })
}


    //     app.delete('/api/notes/:id', function(req, res) {
//         // Gets id number of note to delete
//         const deleteNote = req.params.id;
//         console.log(deleteNote);
    
//         fs.readFile('./db/db.json', (err, data) => {
//           if (err) throw err;
    
//           // Comparing each note's id to delete note
//           data = JSON.parse(data);
//           // for each function, comparing each note's id to the chosen_for_death variable
//           for (let i = 0; i < data.length; i++) {
//             if (data[i].id === Number(deleteNote)) {
//               data.splice([i], 1);
//             }
//           }
//           console.log(data);
//           stringData = JSON.stringify(data);
    
//           fs.writeFile('./db/db.json', stringData, (err, data) => {
//             if (err) throw err;
//           });
//         });
//         // Express response.status(204)
//         res.status(204).send();
//     });
// };
  
// };
 
