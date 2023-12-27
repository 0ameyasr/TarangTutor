const Chapter = require('../models/chapterModel');
const { wrapAsync } = require('../utils/wrapAsync');

// Get details of all chapters
exports.getAllChapters = wrapAsync(async (req, res) => {
  const chapters = await Chapter.find();
  res.json(chapters);
});

// Create a new chapter
exports.createChapter = wrapAsync(async (req, res) => {
  const newChapter = await Chapter.create(req.body);
  res.status(201).json(newChapter);
});

// Get details of a specific chapter by ID
exports.getChapterById = wrapAsync(async (req, res) => {
  const chapter = await Chapter.findById(req.params.id);
  if (!chapter) {
    res.status(404).json({ message: 'Chapter not found' });
    return;
  }
  res.json(chapter);
});

// Update details of a specific chapter by ID
exports.updateChapterById = wrapAsync(async (req, res) => {
  const updatedChapter = await Chapter.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!updatedChapter) {
    res.status(404).json({ message: 'Chapter not found' });
    return;
  }
  res.json(updatedChapter);
});

// Delete a specific chapter by ID
exports.deleteChapterById = wrapAsync(async (req, res) => {
  const deletedChapter = await Chapter.findByIdAndDelete(req.params.id);
  if (!deletedChapter) {
    res.status(404).json({ message: 'Chapter not found' });
    return;
  }
  res.json({ message: 'Chapter deleted' });
});

module.exports = exports;
