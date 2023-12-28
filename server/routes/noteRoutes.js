import express from 'express';
const router = express.Router();
import * as notesController from '../controllers/notesController.js';


// Get all notes for a specific chapter
router.get('/chapters/:chapterId', notesController.getAllNotes);

// Create a new note for a specific chapter
router.post('/chapters/:chapterId', notesController.createNote);

// Update a specific note
router.patch('/:id', notesController.updateNote);

// Delete a specific note
router.delete('/:id', notesController.deleteNote);

export default router;
