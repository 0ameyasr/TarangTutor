const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: String,
  message: String,
  date: Date,
  educator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Educator'
  }
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial;
