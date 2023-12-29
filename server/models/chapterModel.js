import mongoose from 'mongoose';

const chapterSchema = new mongoose.Schema({
  title: String,
  description: String,
  // Other chapter-related fields
});

const Chapter = mongoose.model('Chapter', chapterSchema);

export default Chapter;
