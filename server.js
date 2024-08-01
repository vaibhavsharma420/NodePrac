const express = require('express')
const app = express(); 
const db = require('./db');
const passport = require('./auth');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const bodyParser = require('body-parser');

//Middleware Functions

app.use(bodyParser.json());


const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
  next();
}
app.use(logRequest);


app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local',{session:false});



//API Endpoints

app.get('/',function (req, res) {
  res.send('Hello World')
})

//Import the Router Files
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuItemRoutes');


//Use the Routers
app.use('/person',localAuthMiddleware,personRoutes);
app.use('/menuItem',menuRoutes);


app.listen(PORT,()=>{
    console.log("App is listening on port 3000");
}) 