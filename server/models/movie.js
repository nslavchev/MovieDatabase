const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true
    },

    ganre: {
        type: String
    },

    category: {
        type: String
    },

    actors: {
        type: [String]
    },

    producer: {
        type: String
    },

    productionDate: {
        type: Date
    },

    movieStudio: {
        type: String
    },

    description: {
        type: String
    },

    rating: {
        type: Number
    },

    posterUrl: {
        type: String,
        default: "https://i49.vbox7.com/i/542/542fac636.jpg"
    },

    trailerUrl: {
        type: String,
        default: "https://www.dailymotion.com/video/xeba9s"
    },

    country: {
        type: String
    },

    ratingIMDB: {
        type: Number
    },

    language: {
        type: String
    },

    characters: {
        type: [Object]
    },

    awards: {
        type: [String]
    },

    viewers: {
        type: [String]
    },

    keywords: {
        type: [String]
    }
});

const movie = mongoose.model('movie', movieSchema);

module.exports = movie;