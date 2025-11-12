// Server is a machine jisko hum programme karte hain ki agar koi request aati hai uspe toh usse kya response send karna ha

const config = require('./src/config/config.js');
const express = require('express');
const connectToDB = require('./src/db/db.js');
const noteModel = require('./src/models/note.model.js');

// hum server ko database se connect yahan karenge server.js file


const app = express(); // server created

connectToDB();
app.use(express.json());

app.post('/create-note', async (req, res) => {
    const { title, content } = req.body;

    const createNote = await noteModel.create({
        title,
        content
    });

    console.log(createNote);

    res.status(201).json({ message: "Note created successfully!!", createNote });
});

app.get('/fetch-notes', async (_, res) => {
    const fetchNotes = await noteModel.find();

    res.status(200).json(fetchNotes);
});

app.get('/fetch-note/:id', async (req, res) => {
    const { id: noteId } = req.params;

    const fetchNoteById = await noteModel.findOne({ _id: noteId });
    
    res.status(200).json(fetchNoteById);
});

app.delete('/delete-note/:id', async (req, res) => {
    const { id: noteId } = req.params;

    await noteModel.findOneAndDelete({
        _id: noteId
    });

    res.status(200).json({ message: "Note deleted successfully!!" });
});

app.patch('/update-note/:id', async (req, res) => {
    const { id: noteId } = req.params;

    const { title, content } = req.body;

    await noteModel.findOneAndUpdate(
        { 
            _id: noteId 
        },
        { 
            title,
            content 
        },
        { 
            new: true 
        }
    );

    res.status(200).json({ message: "Note updated successfully" });
});

// app.post("/notes", (req, res) => {
//     notes.push(req.body);
//     res.status(201).json({ message: "Note added successfully!!", notes });
// });

// app.get("/fetch-notes", (req, res) => {
//     console.log(notes);
//     res.json(notes);
// });

// app.get("/fetch-note/:id", (req, res) => {
//     const { id } = req.params;

//     const note = notes.find(n => n.id === Number(id));
//     console.log(note);

//     res.json(note);
// });

// // Mine api for deleting note
// /*app.delete("/note/:id", (req, res) => {
//     const { id } = req.params;

//     const nonDeletedNotes = notes.filter(n => n.id !== Number(id));

//     res.json(nonDeletedNotes);
// });*/

// // But there is a 'delete' keyword in JS which can also delete
// app.delete("/notes/:index", (req, res) => {
//     const { index } = req.params;

//     delete notes[index]; // Using delete keyword

//     res.status(200).json({ message: "Note deleted successfully!!" });
// });

// app.patch("/notes/:index", (req, res) => {
//     const { title } = req.body;
//     const { index } = req.params;

//     notes[index].title = title;

//     res.status(200).json({ message: "Note updated successfully!!" });
// });

const PORT = config?.port || 5500;
// Server starts with this
app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});