const express = require('express')
const app = express(); 
const db = require('./db');

require('dotenv').config();

const PORT = process.env.PORT || 3000;


const bodyParser = require('body-parser');
app.use(bodyParser.json());


app.get('/', function (req, res) {
  res.send('Hello World')
})

//Import the Router Files
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuItemRoutes');

//Use the Routers
app.use('/person', personRoutes);
app.use('/menuItem',menuRoutes);


app.listen(PORT,()=>{
    console.log("App is listening on port 3000");
}) 