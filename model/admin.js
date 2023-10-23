const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
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
    }
},{
    timestamps: true
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;