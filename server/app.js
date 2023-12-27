//read .env-cfg
require('dotenv').config();

//define the importable dependencies
const express = require('express');
const mongoose = require('mongoose');
const ExpressError=require("./utils/ExpressError.js");
const path=require("path");
const ejsMate=require("ejs-mate");
const methodOverride=require("method-override");

//define the server credentials
const app = express();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

//set directive for static views + ejsMate 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs",ejsMate);

//set the middlewares to be used
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.json());

app.get('/', (req, res) => {
    res.render("index.ejs")
});

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

app.all("*", (req, res, next) => {
    next(new ExpressError(404, "page not found"));
}); 

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "something went wrong" } = err;
    res.status(statusCode).send(err.message);  
    next();
});