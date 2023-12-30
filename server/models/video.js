import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  videoURL: String,
  chapter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chapter'
  }
});

export default mongoose.model('Video', videoSchema);


