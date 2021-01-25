require('dotenv').config({ path: './.env' });

const express = require('express');
const mongoose = require('mongoose');
const user = require("./models/user");
const session = require('express-session');
const bcrypt = require('bcryptjs');
const app = express();
const port = 5000;
const MongoStore = require('connect-mongo')(session);
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const { use } = require('passport');
const category = require('./models/Category');
const artist = require('./models/artist');
const movie = require('./models/movie');

const dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@moviecluster.ihtl7.mongodb.net/movie-database?retryWrites=true&w=majority`

const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log("MongoDB is connected")
    } catch (error) {
        console.log(error);
    }
};

connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));
app.use(session({
    store: new MongoStore({ url: dbUrl }),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}));

passport.use(new LocalStrategy({
    usernameField: 'email'
}
    , function (emailInput, passwordInput, done) {
        user.findOne({ email: emailInput })
            .then(async (user) => {
                if (!user) {
                    return done(null, false);
                }
                const passwordIsValid = await bcrypt.compare(passwordInput, user.password);
                if (passwordIsValid) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            }).catch((err) => {
                return done(err);
            });
    }));

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    user.findById(id, function (err, user) {
        if (err) {
            return done(err);
        } else {
            done(null, user);
        }
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

app.use(passport.initialize());
app.use(passport.session());

app.post("/api/signup", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        await user.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            admin: false
        });
        res.send({ success: true });
    } catch (error) {
        if (error.name === 'MongoError' && error.code === 11000) {
            var exists;
            if (error.keyValue.username) {
                exists = 'username';
            } else {
                exists = 'email';
            }
            res.send({ success: false, reason: 'User with this ' + exists + ' already exists!' });
        }
    }
});

app.post("/api/addcategory", async (req, res) => {
    try {
        await category.create({
            genre: req.body.genre
        });
        res.send({ success: true });
    } catch (error) {
        res.send(error);
    }
});

app.post("/api/addmovie", async (req, res) => {
    try {
        await movie.create({
            title: req.body.title,
            genre: req.body.genre,
            producers: req.body.producers,
            productionDate: req.body.productionDate,
            actors: req.body.actors,
            awards: req.body.awards,
            language: req.body.language,
            characters: req.body.characters,
            rating: req.body.rating,
            posterUrl: req.body.posterUrl,
            trailerUrl: req.body.trailerUrl,
            country: req.body.country,
            ratingIMDB: req.body.ratingIMDB,
            description: req.body.description
        });
        res.send({ success: true });
    } catch (error) {
        res.send(error);
    }
});

app.post("/api/addartist", async (req, res) => {
    try {
        await artist.create({
            profession: req.body.profession,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            birthDate: req.body.birthDate
        });
        res.send({ success: true });
    } catch (error) {
        res.send(error);
    }
});

app.post("/api/signout", (req, res) => {
    console.log(req.sessionID);
    req.logout();
    req.session.destroy();
    res.send("success");
});

app.post("/api/signin", passport.authenticate('local'), (req, res) => {
    res.send({ success: true });
    console.log("works");
});

app.get("/api/checkAdmin", (req, res) => {
    console.log("server admin " + req.user.admin);
    res.send(req.user.admin);
});

app.get("/api/checkAuthentication", (req, res) => {
    console.log("auth status: " + req.isAuthenticated());
    res.send(req.isAuthenticated());
});

app.get("/api/getactors", async (req, res) => {
    const actors = await artist.find({ profession: 'Actor' });
    res.send({
        actors: actors
    })
});

app.get("/api/getmovies", async (req, res) => {
    const movies = await movie.find();
    res.send({
        movies: movies
    })
});

app.get("/api/getproducers", async (req, res) => {
    const producers = await artist.find({ profession: 'Producer' });
    res.send({
        producers: producers
    })
});

app.get("/api/getcategories", async (req, res) => {
    const categories = await category.find();
    res.send({
        categories: categories
    })
});