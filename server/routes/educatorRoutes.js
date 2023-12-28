import {
    getAllEducators,
    createEducator,
    getEducatorById,
    updateEducatorById,
    deleteEducatorById,
  } from '../controllers/educatorController.js';
  
  
import express from 'express';
const router = express.Router();

// Routes for educators
router.get('/', getAllEducators);
router.post('/', createEducator);
router.get('/:id', getEducatorById);
router.put('/:id', updateEducatorById);
router.delete('/:id', deleteEducatorById);

export default router;
  