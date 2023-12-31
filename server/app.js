//read .env-cfg
import dotenv from 'dotenv';
dotenv.config();

//define the importable dependencies
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import ExpressError from './utils/ExpressError.js';
import path from 'path';
import ejsMate from 'ejs-mate';
import methodOverride from 'method-override';
import { createReview } from './controllers/ratingController.js';
import Review from './models/ratingModel.js';
import { RecaptchaV2 } from 'express-recaptcha';
import { MongoClient } from 'mongodb';
import { ObjectId } from 'mongodb';
import cookieParser from 'cookie-parser';
import session from 'express-session';

//define the server credentials
const app = express();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const SITE_KEY = process.env.SITE_KEY;
const SECRET_KEY = process.env.SECRET_KEY;
const recaptcha = new RecaptchaV2(SITE_KEY, SECRET_KEY);

//set directive for static views + ejsMate 
app.set("view engine", "ejs");
//app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

//set the middlewares to be used
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use(morgan("combined"));
app.use(cookieParser());

// app.use((req, res, next) => {
//     const userAgent = req.headers['user-agent'];
//     if (!userAgent || !userAgent.includes('Mozilla')) {
//       return res.status(403).send('Forbidden: Access denied');
//     }
//     next();
// });
const sessionoptions = {
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

app.use(session(sessionoptions));




  
//importing the routes related to chapter,educatorRoutes,noteRoutes
import educatorRoutes from './routes/educatorRoutes.js';
import notesRoutes from './routes/noteRoutes.js';
import chapterRoutes from './routes/chapterRoutes.js';


MongoClient.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to MongoDB');
        const db = client.db('TarangSir');
        app.locals.db = db;
    })
    .catch(err => console.error('Error connecting to MongoDB', err));


app.get('/', async (req, res) => {
    const contactData = await app.locals.db.collection('contact_details').findOne({});
    let details = {
        admin_name: contactData.name,
        admin_mob: contactData.mob,
        admin_email: contactData.mail,
        admin_linkedin: contactData.linkedin,
        admin_ig: contactData.instagram,
    };
    res.render("index.ejs", details);
});

app.get('/portfolio', async (req, res) => {
    const contactData = await app.locals.db.collection('contact_details').findOne({});
    let details = {
        admin_name: contactData.name,
        admin_mob: contactData.mob,
        admin_email: contactData.mail,
        admin_linkedin: contactData.linkedin,
        admin_ig: contactData.instagram,
    };
    res.render("portfolio.ejs", details);
});

app.get('/testimonials', async (req, res) => {
    try {
        const reviews = await Review.find();
        const contactData = await app.locals.db.collection('contact_details').findOne({});
        
        let details = {
            admin_name: contactData.name,
            admin_mob: contactData.mob,
            admin_email: contactData.mail,
            admin_linkedin: contactData.linkedin,
            admin_ig: contactData.instagram,
            reviews: reviews,
        };

        res.render('testimonials', details);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching reviews and contact details');
    }
});


app.post('/reviews', createReview);

app.get('/courses', async (req, res) => {
    const contactData = await app.locals.db.collection('contact_details').findOne({});
    const videos = await app.locals.db.collection('videos').find().toArray();
    const notes = await app.locals.db.collection('notes').find().toArray();
    let details = {
        admin_name : contactData.name,
        admin_mob : contactData.mob,
        admin_email : contactData.mail,
        admin_linkedin : contactData.linkedin,
        admin_ig : contactData.instagram,
        videos:videos,
        notes:notes,
    };
    res.render("courses.ejs",details);
});


app.get('/admin', async (req, res) => {
    const contactData = await app.locals.db.collection('contact_details').findOne({});
    let details = {
        admin_name : contactData.name,
        admin_mob : contactData.mob,
        admin_email : contactData.mail,
        admin_linkedin : contactData.linkedin,
        admin_ig : contactData.instagram,
    };
    const dat = {
        site_key: SITE_KEY,
    };
    res.render("admin.ejs", { site_key: SITE_KEY });
});




const isAdmin = (req, res, next) => {
    // Check if the session contains the isAdminLoggedIn flag
    console.log(req.session);
    console.log(req.session.isAdminLoggedIn);
    if (req.session.isAdminLoggedIn) {
        
        next(); // User is authenticated as an admin, proceed to the route handler
    } else {
        res.status(403).send('Forbidden: Access denied');
    }
};

//google re-captcha and authentication of admin
app.post('/auth', recaptcha.middleware.verify, async (req, res) => {
    const contactData = await app.locals.db.collection('contact_details').findOne({});
    const videos = await app.locals.db.collection('videos').find().toArray();
    const reviews = await app.locals.db.collection('reviews').find().toArray();
    let details = {
        admin_id : contactData._id,
        admin_name : contactData.name,
        admin_mob : contactData.mob,
        admin_email : contactData.mail,
        admin_linkedin : contactData.linkedin,
        admin_ig : contactData.instagram,
        videos: videos,
        reviews:reviews,
    };
    if (!req.recaptcha.error) {
        try {
            const adminCredentials = await app.locals.db.collection('admin_credentials').findOne({});
            if (!adminCredentials) {
                throw new Error('Admin credentials not found');
            }
            if (req.body.entered_pass === adminCredentials.passkey && req.body.entered_user === adminCredentials.user) {
                req.session.isAdminLoggedIn = true;
                console.log(req.session);
                
                res.render('dashboard.ejs',details);
            } else {
                res.render('error.ejs');
            }
        } catch (error) {
            console.error('Error authenticating admin', error);
            res.render('error.ejs');
        }
    } else {
        res.render("error.ejs");
    }
});

//handling admin update for the personal details
app.post('/update-contact/:id',isAdmin, async (req, res) => {
    try {
        const { name, mob, mail, linkedin, instagram } = req.body;
        const contactDetailsId = req.params.id;
        const contactDetailsCollection = app.locals.db.collection('contact_details');

        const updateFields = {};
        if (name) updateFields.name = name;
        if (mob) updateFields.mob = mob;
        if (mail) updateFields.mail = mail;
        if (linkedin) updateFields.linkedin = linkedin;
        if (instagram) updateFields.instagram = instagram;

        const result = await contactDetailsCollection.updateOne(
            { _id: new ObjectId(contactDetailsId) },
            { $set: updateFields }
        );

        if (result.modifiedCount === 1) {
            res.render("success.ejs");
        } else {
            res.status(404).render('commiterror.ejs');
        }
    } catch (error) {
        console.error(error);
        res.status(500).render('commiterror.ejs');
    }
});

app.post('/add-video',isAdmin,async(req,res)=>{
    try{
        const {title, description,url,duration} = req.body;
        app.locals.db.collection('videos').insertOne(
            {
                title: title,
                description: description,
                url: url,
                duration:duration,
            }
        );
        res.status(200).render("success.ejs");
    } catch (error)
    {
        console.error(error);
        res.status(500).send("oops!");
    }
});

app.post('/add-notes',isAdmin,async(req,res)=>{
    try{
        const {topic,course,url} = req.body;
        app.locals.db.collection('notes').insertOne(
            {
                topic: topic,
                course: course,
                url: url,
            }
        );
        res.status(200).render("success.ejs");
    } catch (error)
    {
        console.error(error);
        res.status(500).send("oops!");
    }
});

app.post('/delete-video',isAdmin, async (req, res) => {
    try {
        const { url } = req.body;
        const videoId = req.params.id;
        const result = await app.locals.db.collection('videos').deleteOne(
            {url: url}
        );

        if (result.deletedCount === 1) {
            res.render("success.ejs");
        } else {
            res.status(404).render('commiterror.ejs');
        }
    } catch (error) {
        console.error(error);
        res.status(500).render('commiterror.ejs');
    }
});

app.post('/delete-notes',isAdmin, async (req, res) => {
    try {
        const { url } = req.body;
        const videoId = req.params.id;
        const result = await app.locals.db.collection('notes').deleteOne(
            {url: url}
        );

        if (result.deletedCount === 1) {
            res.render("success.ejs");
        } else {
            res.status(404).render('commiterror.ejs');
        }
    } catch (error) {
        console.error(error);
        res.status(500).render('commiterror.ejs');
    }
});

app.post('/delete-review',isAdmin, async (req, res) => {
    try {
      const { mail } = req.body;
      const result = await app.locals.db.collection('reviews').deleteOne({
        mail: mail,
      });
      if (result.deletedCount === 1) {
        res.status(200).render("success.ejs");
      } else {
        res.status(404).render("commiterror.ejs");
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('commiterror.ejs');
    }
  });  

//created middleware to find related route if request comes
app.use('/educator', educatorRoutes);
app.use('/chapters', chapterRoutes);
app.use('/notes', notesRoutes);

//establish MongoDB connection
mongoose.connect(MONGO_URL)
    .then(() => {
        app.listen(PORT, (req, res) => {
            console.log(`Server is live :@${PORT}`);
        })
    })
    .catch((err) => {
        console.log(err)
    });

//this is used to handle the route that doesnot exist
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "page not found"));
});

//this middleware will handle the error if comes and pass the message to default error handler
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "something went wrong" } = err;
    res.status(statusCode).send(err.message);
    next();
});

