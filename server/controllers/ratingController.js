import Review from '../models/ratingModel.js';
import wrapAsync from '../utils/wrapAsync.js';
import ExpressError from '../utils/ExpressError.js';

const createReview = wrapAsync(async (req, res) => {
    const { comment, rating, author } = req.body;
  
    const newReview = new Review({
      comment,
      rating,
      author,
      createdAt: new Date(),
    });
  
    const savedReview = await newReview.save();
  
    if (!savedReview) {
      throw new ExpressError('Failed to save review', 500); // Custom error if review couldn't be saved
    }
  
    res.redirect('/');
  });
  
  export { createReview };