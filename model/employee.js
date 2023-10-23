const mongoose = require('mongoose');

const empSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    DOB:{
        type: Date,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    emp_ID:{
        type: String,
        required: true
    },
    department:{
        type: String,
        required: true
    },
    DOJ:{
        type: Date,
        required:true
    },
    emp_email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    performance_review: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Performance'
    },
    for_review: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Emp'
    }]
},{
    timestamps: true
});

const Emp = mongoose.model('Emp', empSchema);
module.exports = Emp;