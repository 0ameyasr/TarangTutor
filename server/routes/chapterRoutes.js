import express from 'express';
const router = express.Router();
import {
  getAllChapters,
  getChapterById,
  createChapter,
  updateChapterById,
  deleteChapterById
} from '../controllers/chapterController';

// Define routes using individual controller methods
router.get('/', getAllChapters);
router.get('/:id', getChapterById);
router.post('/', createChapter);
router.put('/:id', updateChapterById);
router.delete('/:id', deleteChapterById);

export default router;
