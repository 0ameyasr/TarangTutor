import Review from '../models/ratingModel.js';
import wrapAsync from '../utils/wrapAsync.js';
import ExpressError from '../utils/ExpressError.js';


const createReview = wrapAsync(async (req, res) => {
    const { comment,rating,author,mail } = req.body;
    const newReview = new Review({
      comment,
      rating,
      createdAt: new Date(),
      author,
      mail,
    });
  
    const savedReview = await newReview.save();
  
    if (!savedReview) {
      res.render('reviewerror.ejs');
      throw new ExpressError('Failed to save review', 500);
    }
  
    res.redirect('/');
  });
  
  export { createReview };