const express = require('express');
const router = express.Router();
const chapterController = require('../controllers/chapterController');

// Define a base path for Chapter routes
router.get('/', chapterController.getAllChapters);
router.get('/:id', chapterController.getChapterById);
router.post('/', chapterController.createChapter);
router.put('/:id', chapterController.updateChapterById);
router.delete('/:id', chapterController.deleteChapterById);

module.exports = router;
