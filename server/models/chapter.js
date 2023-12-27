const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  title: String,
  description: String,
  // Other chapter-related fields
});

const Chapter = mongoose.model('Chapter', chapterSchema);

module.exports = Chapter;
