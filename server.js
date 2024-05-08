const express = require('express');
const app = express();
const db = require('./db');

// use middleware - bodyparser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
 

app.get('/',(req,res)=> {
    res.send("Welcome to my hotel, How can i help you!!");
})

// Person route
const personRoutes = require('./routes/personRoute');
// Use the router
app.use('/person',personRoutes);

// 2. MenuItem Route
const menuItemRoute = require('./routes/menuItemRoute');
// use the router
app.use('/menuItem',menuItemRoute);

app.listen(3000,()=> {
    console.log("listening the port 3000")
});