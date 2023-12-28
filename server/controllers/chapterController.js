import Chapter from '../models/chapter.js';
import wrapAsync from '../utils/wrapAsync.js';
import ExpressError from '../utils/ExpressError.js';

export const getAllChapters = wrapAsync(async (req, res) => {
  const chapters = await Chapter.find();
  res.json(chapters);
});

export const createChapter = wrapAsync(async (req, res) => {
  const newChapter = await Chapter.create(req.body);
  res.status(201).json(newChapter);
});

export const getChapterById = wrapAsync(async (req, res) => {
  const chapter = await Chapter.findById(req.params.id);
  if (!chapter) {
    throw new ExpressError('Chapter not found', 404);
  }
  res.json(chapter);
});

export const updateChapterById = wrapAsync(async (req, res) => {
  const updatedChapter = await Chapter.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!updatedChapter) {
    throw new ExpressError('Chapter not found', 404);
  }
  res.json(updatedChapter);
});

export const deleteChapterById = wrapAsync(async (req, res) => {
  const deletedChapter = await Chapter.findByIdAndDelete(req.params.id);
  if (!deletedChapter) {
    throw new ExpressError('Chapter not found', 404);
  }
  res.json({ message: 'Chapter deleted' });
});
