import mongoose from 'mongoose';

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
    content: String,
    notesURL: String
  },
  socialMediaHandles: {
    twitter: String,
    facebook: String,
    linkedin: String,
  }
});

const Educator = mongoose.model('Educator', educatorSchema);

export default Educator;
