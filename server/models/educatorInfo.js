//This collection stores details about Tarang Sir, including personal information, skills, achievements, videos, notes, testimonials, and social media handles.
const mongoose = require('mongoose');

const educatorSchema = new mongoose.Schema({
  name: String,
  designation: String,
  address: String,
  about: String,
  skills: [String],
  achievements: [String],
  demoVideo: {
    title: String,
    description: String,
    videoURL: String
  },
  demoNotes: {
    title: String,
    content: String
  },
  socialMediaHandles: {
    twitter: String,
    facebook: String,
    linkedin: String,
    
  }
});

const Educator = mongoose.model('Educator', educatorSchema);

module.exports = Educator;
