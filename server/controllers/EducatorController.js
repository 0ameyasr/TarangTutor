import Educator from '../models/educatorInfo.js';
import wrapAsync from '../utils/wrapAsync.js';
import ExpressError from "../utils/ExpressError.js";

// Get details of all educators
export const getAllEducators = wrapAsync(async (req, res) => {
  const educators = await Educator.find();
  res.json(educators);
});

// Create a new educator
export const createEducator = wrapAsync(async (req, res) => {
  const newEducator = await Educator.create(req.body);
  res.status(201).json(newEducator);
});

// Get details of a specific educator by ID
export const getEducatorById = wrapAsync(async (req, res) => {
  const educator = await Educator.findById(req.params.id);
  if (!educator) {
    throw new ExpressError('Educator not found', 404);
  }
  res.json(educator);
});

// Update details of a specific educator by ID
export const updateEducatorById = wrapAsync(async (req, res) => {
  const updatedEducator = await Educator.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!updatedEducator) {
    throw new ExpressError('Educator not found', 404);
  }
  res.json(updatedEducator);
});

// Delete a specific educator by ID
export const deleteEducatorById = wrapAsync(async (req, res) => {
  const deletedEducator = await Educator.findByIdAndDelete(req.params.id);
  if (!deletedEducator) {
    throw new ExpressError('Educator not found', 404);
  }
  res.json({ message: 'Educator deleted' });
});
