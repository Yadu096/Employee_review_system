const mongoose = require('mongoose');

const performanceSchema = new mongoose.Schema({
    rating:{
        type: Number,
        required: true
    },
    feedback:{
        type: String,
        required: true
    },
    review_by:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Emp',
        required: true
    },
    review_for: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Emp',
        required: true
    }
},{
    timestamps: true
});

const Performance = mongoose.model('Performance', performanceSchema);
module.exports = Performance;