const express = require('express');
const router = express.Router();
const educatorController = require('../controllers/EducatorController');

// GET all educators
router.get('/', educatorController.getAllEducators);

// GET a specific educator by ID
router.get('/:id', educatorController.getEducatorById);

// POST create a new educator
router.post('/', educatorController.createEducator);

// PUT update a specific educator by ID
router.put('/:id', educatorController.updateEducatorById);

// DELETE a specific educator by ID
router.delete('/:id', educatorController.deleteEducatorById);

module.exports = router;
