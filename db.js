const mongoose = require('mongoose');

// Define the mongoose url
const mongoURL = 'mongodb://127.0.0.1:27017/hotels'

// setup the mongodb connection 
mongoose.connect(mongoURL,{
    useNewUrlParser : true,
    useUnifiedTopology : true
})

// get default connection
const db = mongoose.connection;

// define event listener
db.on('connected',()=> {
    console.log("Connected to Mongodb server");
})

db.on('disconnected',()=> {
    console.log("Mongodb disconnected");
})

db.on('error',(err)=> {
    console.log("Mongodb connection error",err);
})

// export the db
module.exports = db;