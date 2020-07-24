const express = require("express");
const app = express();
const path = require('path');
const fs = require('fs');
const noteData = require('./public/db/db.json');
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Create routes the the HTML Pages using GET requests

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
})

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
})

app.get('/api/notes', (req, res) => {
    res.json(noteData);
})

app.post('/api/notes', (req, res) => {
    noteData.push(req.body);
    noteData.forEach((note, i) => {
        note.id = i + 1;
    })
    let newNote = JSON.stringify(noteData);
    fs.writeFileSync('./public/db/db.json', newNote);

    res.json(noteData);
})

app.delete('/api/notes/:id', (req, res) => {

    let filtered = noteData.filter(note => note.id !== parseInt(req.params.id));
    fs.writeFileSync('./public/db/db.json', JSON.stringify(filtered));

    //alter the note data with the filtered results so when it sends the response back it is immediately showned on the front end
    noteData = filtered;

    res.json(noteData);

})

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
})