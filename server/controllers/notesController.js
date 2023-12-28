import Note from '../models/Notes.js';
import { wrapAsync } from '../utils/wrapAsync.js';



  


// Controller methods
module.exports.getAllNotes = wrapAsync(async (req, res) => {
  const notes = await Note.find({ chapter: req.params.chapterId });
  res.json(notes);
});




module.exports.createNote = wrapAsync(async (req, res) => {
  const { title, content, noteLink } = req.body;
  const newNote = new Note({
    title,
    content,
    noteLink,
    chapter: req.params.chapterId
  });
  const savedNote = await newNote.save();
  res.status(201).json({ message: 'Note created', note: savedNote });
});


module.exports.updateNote = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const updatedNote = await Note.findByIdAndUpdate(id, req.body, { new: true });
  if (!updatedNote) {
    res.status(404).json({ message: 'Note not found' });
  }
  res.json(updatedNote);
});

module.exports.deleteNote = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const deletedNote = await Note.findByIdAndDelete(id);
  if (!deletedNote) {
    res.status(404).json({ message: 'Note not found' });
  }
  res.json({ message: 'Note deleted' });
});


