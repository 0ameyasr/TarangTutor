const mongoose = require('mongoose');

// Define the schema for the Note document
const noteSchema = new mongoose.Schema({
  title: String, // Field to store the title of the note
  content: String, // Field to store the content or body of the note
  noteLink: String, // Field to store the link of the uploaded PDF file
  chapter: { // Field referencing the Chapter document
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chapter'
  }
});
