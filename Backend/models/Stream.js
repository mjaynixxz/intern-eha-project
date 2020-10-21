const mongoose = require('mongoose');


const streamSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Action', 'Adventure', 'Sports', 'Crime', 'Fps'],
        required: true    },
    description: {
        type: String,
        minLength: 6
    }
});

module.exports = mongoose.model('stream', streamSchema);