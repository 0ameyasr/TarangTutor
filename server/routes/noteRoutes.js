const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');

// Get all notes for a specific chapter
router.get('/chapters/:chapterId/notes', notesController.getAllNotes);

// Create a new note for a specific chapter
router.post('/chapters/:chapterId/notes', notesController.createNote);

// Update a specific note
router.patch('/notes/:id', notesController.updateNote);

// Delete a specific note
router.delete('/notes/:id', notesController.deleteNote);

module.exports = router;
