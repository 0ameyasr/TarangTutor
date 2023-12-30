import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: String,
  message: String,
  date: Date,
  educator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Educator'
  }
});

export default mongoose.model('Testimonial', testimonialSchema);


