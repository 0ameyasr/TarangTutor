const mongoose = require('mongoose');

// Define the schema for the Note document
const noteSchema = new mongoose.Schema({
  title: String, // Field to store the title of the note
  content: String, // Field to store the content or body of the note
  pdfFile: String, // Field to store the filename of the uploaded PDF file
  chapter: { // Field referencing the Chapter document
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chapter'
  }
});

// Create a Note model using the noteSchema
const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
