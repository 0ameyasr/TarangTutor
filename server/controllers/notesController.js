const Note = require('../models/noteModel');
const multer = require('multer');
const path = require('path');
const { wrapAsync } = require('../utils/wrapAsync');

// Multer storage configuration for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Destination directory for storing uploaded files
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname)); // Generating unique filenames for uploaded files
    }
  });
  
  // Define the upload configuration
  const upload = multer({ 
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 10 }, // Limit file size to 10MB
    fileFilter: function(req, file, cb) {
      const filetypes = /pdf/;
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = filetypes.test(file.mimetype);
      if(mimetype && extname) {
        cb(null, true);
      } else {
        cb(new Error('Only PDF files are allowed'));
      }
  }}).single('pdfFile'); // 'pdfFile' is the name attribute in our HTML form for the file input
  


// Controller methods
module.exports.getAllNotes = wrapAsync(async (req, res) => {
  const notes = await Note.find({ chapter: req.params.chapterId });
  res.json(notes);
});

module.exports.createNote = (req, res) => {
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        res.status(400).json({ message: 'File upload error', error: err.message });
      } else if (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
      } else {
        try {
          const { title, content } = req.body;
          const newNote = new Note({
            title,
            content,
            pdfFile: req.file.filename // Save the filename of the uploaded PDF in our Note model
          });
          const savedNote = await newNote.save();
          res.status(201).json({ message: 'Note created', note: savedNote });
        } catch (err) {
          res.status(500).json({ message: 'Error creating note', error: err.message });
        }
      }
    });
  };

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


