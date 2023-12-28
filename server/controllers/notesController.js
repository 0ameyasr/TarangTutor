import Note from '../models/Notes.js';
import wrapAsync from '../utils/wrapAsync.js';
import ExpressError from "../utils/ExpressError.js";

// Controller methods
export const getAllNotes = wrapAsync(async (req, res, next) => {
  const notes = await Note.find({ chapter: req.params.chapterId });
  res.json(notes);
});

export const createNote = wrapAsync(async (req, res, next) => {
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

export const updateNote = wrapAsync(async (req, res, next) => {
  const { id } = req.params;
  const updatedNote = await Note.findByIdAndUpdate(id, req.body, { new: true });
  if (!updatedNote) {
    throw new ExpressError('Note not found', 404);
  }
  res.json(updatedNote);
});

export const deleteNote = wrapAsync(async (req, res, next) => {
  const { id } = req.params;
  const deletedNote = await Note.findByIdAndDelete(id);
  if (!deletedNote) {
    throw new ExpressError('Note not found', 404);
  }
  res.json({ message: 'Note deleted' });
});

