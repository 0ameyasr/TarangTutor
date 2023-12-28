//read .env-cfg
import dotenv from 'dotenv';
dotenv.config();

//define the importable dependencies
import express from 'express';
import mongoose from 'mongoose';
import ExpressError from './utils/ExpressError.js';
import path from 'path';
import ejsMate from 'ejs-mate';
import methodOverride from 'method-override';
//define the server credentials
const app = express();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

//set directive for static views + ejsMate 
app.set("view engine", "ejs");
//app.set("views", path.join(__dirname, "views"));
app.engine("ejs",ejsMate);

//set the middlewares to be used
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(express.json());

//importing the routes related to chapter,educatorRoutes,noteRoutes
const educatorRoutes = require('./routes/educatorRoutes.js');
const notesRoutes=require('./routes/noteRoutes.js');
const chapterRoutes = require('./routes/chapterRoutes.js');

app.get('/', (req, res) => {
    res.render("index.ejs");
});

//created middleware to find related route if request comes
app.use('/educator', educatorRoutes);
app.use('/chapters',chapterRoutes);
app.use('/notes',notesRoutes);


//establish MongoDB connection
mongoose.connect(MONGO_URL)
    .then(() => {
        app.listen(PORT, (req, res)=>{
            console.log(`listening @port ${PORT}`);
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