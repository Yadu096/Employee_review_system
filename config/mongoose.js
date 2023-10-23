const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Emp_review_sys_db');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Could not connect to mongo"));

db.once('open', function(){
    console.log("Mongodb loaded successfully");
})

module.exports = db;