const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },

    lastName: {
        type: String
    },

    username: {
        type: String,
        unique: true
    },

    email: {
        type: String,
        unique: true
    },

    password: {
        type: String
    },

    admin: {
        type: Boolean
    }
});

const user = mongoose.model('user', userSchema);

module.exports = user;