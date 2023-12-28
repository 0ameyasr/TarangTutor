import Educator from '../models/educatorInfo.js';
import { wrapAsync } from '../utils/wrapAsync.js';


// Get details of all educators
exports.getAllEducators = wrapAsync(async (req, res) => {
  const educators = await Educator.find();
  res.json(educators);
});

// Create a new educator
exports.createEducator = wrapAsync(async (req, res) => {
  const newEducator = await Educator.create(req.body);
  res.status(201).json(newEducator);
});

// Get details of a specific educator by ID
exports.getEducatorById = wrapAsync(async (req, res) => {
  const educator = await Educator.findById(req.params.id);
  if (!educator) {
    res.status(404).json({ message: 'Educator not found' });
    return;
  }
  res.json(educator);
});

// Update details of a specific educator by ID
exports.updateEducatorById = wrapAsync(async (req, res) => {
  const updatedEducator = await Educator.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!updatedEducator) {
    res.status(404).json({ message: 'Educator not found' });
    return;
  }
  res.json(updatedEducator);
});

// Delete a specific educator by ID
exports.deleteEducatorById = wrapAsync(async (req, res) => {
  const deletedEducator = await Educator.findByIdAndDelete(req.params.id);
  if (!deletedEducator) {
    res.status(404).json({ message: 'Educator not found' });
    return;
  }
  res.json({ message: 'Educator deleted' });
});

module.exports = exports;
