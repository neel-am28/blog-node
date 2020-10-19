const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const blogRoutes = require('./routes/blogRoutes');
const viewRoutes = require('./routes/viewRoutes');
// import 'bootstrap';
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// mongo connection string
mongoose.connect(process.env.MONGO_URI,
    {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true},
    () => {
        console.log("Connected to mongodb");    
    }
);
// middleware to get form input in req.body
app.use(bodyParser.urlencoded({
    extended: false
 }));
 
 app.use(bodyParser.json());
 
// set public directory as static directory
app.use(express.static(path.join(__dirname, 'public')));

// setting view engine
app.set("view engine", "ejs");

// running app
app.listen(port, () => console.log(`Listening on port ${port}`));


  
app.use('/', viewRoutes);
app.use('/blogs', blogRoutes);