const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    profession: {
        type: String
    },

    firstName: {
        type: String
    },

    lastName: {
        type: String
    },

    birthDate: {
        type: Date
    }
});

const artist = mongoose.model('artist', artistSchema);

module.exports = artist;